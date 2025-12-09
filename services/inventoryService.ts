import prisma from "../config/db";
import type { Prisma } from "@prisma/client";

type InventoryItem = Prisma.inventoryGetPayload<object>;

// Create Inventory Item
export const createInventory = async (data: {
  name: string;
  fno: string;
  pack: string;
  unit: string;
  remarks?: string;
}) => {
  return await prisma.inventory.create({
    data,
  });
};

// Helper: Calculate current stock for an inventory item
export const calculateCurrentStock = async (
  inventoryId: number
): Promise<number> => {
  const additions = await prisma.inventory_addition.aggregate({
    where: { inventory_id: inventoryId },
    _sum: { quantity: true },
  });

  const subtractions = await prisma.inventory_subtraction.aggregate({
    where: { inventory_id: inventoryId },
    _sum: { quantity: true },
  });

  return (additions._sum.quantity || 0) - (subtractions._sum.quantity || 0);
};

// Get All Inventory Items with current stock
export const getAllInventory = async () => {
  const items = await prisma.inventory.findMany({
    orderBy: {
      createdAt: "desc", // Sort by creation date, newest first
    },
  });

  // Calculate current stock for each item
  const itemsWithStock = await Promise.all(
    items.map(async (item: InventoryItem) => ({
      ...item,
      currentStock: await calculateCurrentStock(item.id),
    }))
  );

  return itemsWithStock;
};

// Get Inventory Item by ID with current stock
export const getInventoryById = async (id: number) => {
  const item = await prisma.inventory.findUnique({
    where: { id },
  });

  if (!item) {
    return null;
  }

  const currentStock = await calculateCurrentStock(id);

  return {
    ...item,
    currentStock,
  };
};

// Update Inventory Item
export const updateInventory = async (
  id: number,
  data: {
    name?: string;
    fno?: string;
    pack?: string;
    unit?: string;
    remarks?: string;
  }
) => {
  return await prisma.inventory.update({
    where: { id },
    data,
  });
};

// Delete Inventory Item
export const deleteInventory = async (id: number) => {
  return await prisma.inventory.delete({
    where: { id },
  });
};

// Create Inventory Addition (with full transaction details)
export const createInventoryAddition = async (data: {
  inventory_id: number;
  quantity: number;
  price: number; // Actual purchase price for this transaction
  vendor: string;
  phone: string;
  date?: Date;
  remarks?: string;
}) => {
  // Use a transaction to ensure both operations succeed or fail together
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // 1. Check if inventory exists
    const inventory = await tx.inventory.findUnique({
      where: { id: data.inventory_id },
    });

    if (!inventory) {
      throw new Error("Inventory item not found");
    }

    // 2. Create addition record with all transaction details
    const addition = await tx.inventory_addition.create({
      data: {
        inventory_id: data.inventory_id,
        quantity: data.quantity,
        price: data.price,
        vendor: data.vendor,
        phone: data.phone,
        date: data.date || new Date(),
        remarks: data.remarks,
      },
      include: {
        inventory: true,
      },
    });

    return addition;
  });
};

// Get All Additions
export const getAllAdditions = async () => {
  return await prisma.inventory_addition.findMany({
    include: {
      inventory: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

// Get Additions by Inventory ID
export const getAdditionsByInventoryId = async (inventoryId: number) => {
  return await prisma.inventory_addition.findMany({
    where: {
      inventory_id: inventoryId,
    },
    include: {
      inventory: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

// Get Addition by ID
export const getAdditionById = async (id: number) => {
  return await prisma.inventory_addition.findUnique({
    where: { id },
    include: {
      inventory: true,
    },
  });
};

// Delete Addition
export const deleteAddition = async (id: number) => {
  // Simply delete the addition record
  return await prisma.inventory_addition.delete({
    where: { id },
  });
};







// Create Inventory Subtraction--------------------------- (with full transaction details)
export const createInventorySubtraction = async (data: {
  inventory_id: number;
  quantity: number;
  price: number;
  vendor: string;
  phone: string;
  date?: Date;
  remarks?: string;
}) => {
  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    // 1. Check if inventory exists
    const inventory = await tx.inventory.findUnique({
      where: { id: data.inventory_id },
    });

    if (!inventory) {
      throw new Error("Inventory item not found");
    }

    // 2. Calculate current stock from additions and subtractions
    const additions = await tx.inventory_addition.aggregate({
      where: { inventory_id: data.inventory_id },
      _sum: { quantity: true },
    });

    const subtractions = await tx.inventory_subtraction.aggregate({
      where: { inventory_id: data.inventory_id },
      _sum: { quantity: true },
    });

    const currentStock =
      (additions._sum.quantity || 0) - (subtractions._sum.quantity || 0);

    // 3. Check if there's enough stock
    if (currentStock < data.quantity) {
      throw new Error(
        `Insufficient inventory. Available: ${currentStock}, Requested: ${data.quantity}`
      );
    }

    // 4. Create subtraction record
    const subtraction = await tx.inventory_subtraction.create({
      data: {
        inventory_id: data.inventory_id,
        quantity: data.quantity,
        price: data.price,
        vendor: data.vendor,
        phone: data.phone,
        date: data.date || new Date(),
        remarks: data.remarks,
      },
      include: {
        inventory: true,
      },
    });

    return subtraction;
  });
};

// Get All Subtractions
export const getAllSubtractions = async () => {
  return await prisma.inventory_subtraction.findMany({
    include: {
      inventory: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

// Get Subtractions by Inventory ID
export const getSubtractionsByInventoryId = async (inventoryId: number) => {
  return await prisma.inventory_subtraction.findMany({
    where: {
      inventory_id: inventoryId,
    },
    include: {
      inventory: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

// Get Subtraction by ID
export const getSubtractionById = async (id: number) => {
  return await prisma.inventory_subtraction.findUnique({
    where: { id },
    include: {
      inventory: true,
    },
  });
};

// Delete Subtraction
export const deleteSubtraction = async (id: number) => {
  // Simply delete the subtraction record
  return await prisma.inventory_subtraction.delete({
    where: { id },
  });
};
