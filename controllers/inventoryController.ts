import { Request, Response } from "express";
import * as inventoryService from "../services/inventoryService";

export const createInventory = async (req: Request, res: Response) => {
  try {
    const { name, fno, pack, unit, remarks } = req.body;

    // Validate required fields
    if (!name || !fno || !pack || !unit) {
      return res.status(400).json({
        message: "Missing required fields: name, fno, pack, and unit are required",
      });
    }

    const inventoryData = { name, fno, pack, unit, remarks };
    const inventory = await inventoryService.createInventory(inventoryData);
    return res.status(201).json(inventory);
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "Error creating inventory item", error: error.message });
  }
};

export const getAllInventory = async (_req: Request, res: Response) => {
  try {
    const inventory = await inventoryService.getAllInventory();
    return res.json(inventory);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error fetching inventory", error: error.message });
  }
};

export const getInventoryById = async (req: Request, res: Response) => {
  try {
    const inventory = await inventoryService.getInventoryById(
      Number(req.params.id)
    );
    if (!inventory)
      return res.status(404).json({ message: "Inventory item not found" });
    return res.json(inventory);
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Error fetching inventory item", error: error.message });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { name, fno, pack, unit, remarks } = req.body;
    const updateData = { name, fno, pack, unit, remarks };

    const inventory = await inventoryService.updateInventory(
      Number(req.params.id),
      updateData
    );
    return res.json(inventory);
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "Error updating inventory item", error: error.message });
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  try {
    await inventoryService.deleteInventory(Number(req.params.id));
    return res.json({ message: "Inventory item deleted successfully" });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "Error deleting inventory item", error: error.message });
  }
};

// Addition Controllers
export const createAddition = async (req: Request, res: Response) => {
  try {
    const { inventory_id, quantity, price, vendor, phone, date, remarks } =
      req.body;

    // Validate required fields
    if (!inventory_id || !quantity || !price || !vendor || !phone) {
      return res.status(400).json({
        message:
          "Missing required fields: inventory_id, quantity, price, vendor, and phone are required",
      });
    }

    const additionData = {
      inventory_id: Number(inventory_id),
      quantity: Number(quantity),
      price: Number(price),
      vendor,
      phone,
      date: date ? new Date(date) : undefined,
      remarks,
    };

    const addition = await inventoryService.createInventoryAddition(
      additionData
    );
    return res.status(201).json(addition);
  } catch (error: any) {
    return res.status(400).json({
      message: "Error creating inventory addition",
      error: error.message,
    });
  }
};

export const getAllAdditions = async (_req: Request, res: Response) => {
  try {
    const additions = await inventoryService.getAllAdditions();
    return res.json(additions);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching inventory additions",
      error: error.message,
    });
  }
};

export const getAdditionsByInventoryId = async (
  req: Request,
  res: Response
) => {
  try {
    const inventoryId = Number(req.params.inventoryId);

    if (isNaN(inventoryId)) {
      return res.status(400).json({ message: "Invalid inventory ID" });
    }

    const additions = await inventoryService.getAdditionsByInventoryId(
      inventoryId
    );
    return res.json(additions);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching inventory additions",
      error: error.message,
    });
  }
};

export const getAdditionById = async (req: Request, res: Response) => {
  try {
    const addition = await inventoryService.getAdditionById(
      Number(req.params.id)
    );
    if (!addition) {
      return res.status(404).json({ message: "Addition record not found" });
    }
    return res.json(addition);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching addition record",
      error: error.message,
    });
  }
};

export const deleteAddition = async (req: Request, res: Response) => {
  try {
    await inventoryService.deleteAddition(Number(req.params.id));
    return res.json({
      message: "Addition deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error deleting addition record",
      error: error.message,
    });
  }
};



export const createSubtraction = async (req: Request, res: Response) => {
  try {
    const { inventory_id, quantity, price, vendor, phone, date, remarks } =
      req.body;

    // Validate required fields
    if (!inventory_id || !quantity || !price || !vendor || !phone) {
      return res.status(400).json({
        message:
          "Missing required fields: inventory_id, quantity, price, vendor, and phone are required",
      });
    }

    const subtractionData = {
      inventory_id: Number(inventory_id),
      quantity: Number(quantity),
      price: Number(price),
      vendor,
      phone,
      date: date ? new Date(date) : undefined,
      remarks,
    };

    const subtraction =
      await inventoryService.createInventorySubtraction(
        subtractionData
      );
    return res.status(201).json(subtraction);
  } catch (error: any) {
    return res.status(400).json({
      message: "Error creating inventory subtraction",
      error: error.message,
    });
  }
};

export const getAllSubtractions = async (_req: Request, res: Response) => {
  try {
    const subtractions = await inventoryService.getAllSubtractions();
    return res.json(subtractions);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching inventory subtractions",
      error: error.message,
    });
  }
};

export const getSubtractionsByInventoryId = async (
  req: Request,
  res: Response
) => {
  try {
    const inventoryId = Number(req.params.inventoryId);

    if (isNaN(inventoryId)) {
      return res.status(400).json({ message: "Invalid inventory ID" });
    }

    const subtractions =
      await inventoryService.getSubtractionsByInventoryId(
        inventoryId
      );
    return res.json(subtractions);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching inventory subtractions",
      error: error.message,
    });
  }
};

export const getSubtractionById = async (req: Request, res: Response) => {
  try {
    const subtraction = await inventoryService.getSubtractionById(
      Number(req.params.id)
    );
    if (!subtraction) {
      return res.status(404).json({ message: "Subtraction record not found" });
    }
    return res.json(subtraction);
  } catch (error: any) {
    return res.status(500).json({
      message: "Error fetching subtraction record",
      error: error.message,
    });
  }
};

export const deleteSubtraction = async (req: Request, res: Response) => {
  try {
    await inventoryService.deleteSubtraction(Number(req.params.id));
    return res.json({
      message: "Subtraction deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error deleting subtraction record",
      error: error.message,
    });
  }
};
