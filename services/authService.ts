import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db";

const JWT_SECRET: string =
  (process.env.JWT_SECRET as string) ||
  "your-secret-key-change-this-in-production";
const JWT_EXPIRES_IN: string = (process.env.JWT_EXPIRES_IN as string) || "7d";
const SALT_ROUNDS = 10;

interface SignupData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: number, email: string): string => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// ---------------- SIGNUP ----------------
export const signup = async (data: SignupData) => {
  const { email, password } = data;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
    select: { id: true, email: true, createdAt: true },
  });

  const token = generateToken(user.id, user.email);

  return { user, token };
};

// ---------------- LOGIN ----------------
export const login = async (data: LoginData) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid email or password");

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) throw new Error("Invalid email or password");

  const token = generateToken(user.id, user.email);

  const { password: _, ...sanitizedUser } = user;

  return { user: sanitizedUser, token };
};

// ---------------- GET USER BY ID ----------------
export const getUserById = async (userId: number) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// ---------------- VERIFY JWT ----------------
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Invalid or expired token");
  }
};
