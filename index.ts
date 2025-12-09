import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import inventoryRoutes from "./routes/inventoryRoute";
import authRoutes from "./routes/authRoute";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://venusinventory.vercel.app/",
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.json({
    message: "Venus Inventory Management System API",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      inventory: "/api/inventory",
      additions: "/api/inventory/additions",
      subtractions: "/api/inventory/subtractions",
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
