import { Router } from "express";
import * as inventoryController from "../controllers/inventoryController";

const router = Router();

// Main Inventory CRUD
router.post("/", inventoryController.createInventory); // Create
router.get("/", inventoryController.getAllInventory); // Read all
router.get("/:id", inventoryController.getInventoryById); // Read one
router.put("/:id", inventoryController.updateInventory); // Update
router.delete("/:id", inventoryController.deleteInventory); // Delete

// Addition Routes
router.post("/additions", inventoryController.createAddition); // Create addition
router.get("/additions", inventoryController.getAllAdditions); // Get all additions
router.get(
  "/additions/inventory/:inventoryId",
  inventoryController.getAdditionsByInventoryId
); // Get additions by inventory ID
router.get("/additions/:id", inventoryController.getAdditionById); // Get single addition
router.delete("/additions/:id", inventoryController.deleteAddition); // Delete addition

// Subtraction Routes
router.post("/subtractions", inventoryController.createSubtraction); // Create subtraction
router.get("/subtractions", inventoryController.getAllSubtractions); // Get all subtractions
router.get(
  "/subtractions/inventory/:inventoryId",
  inventoryController.getSubtractionsByInventoryId
); // Get subtractions by inventory ID
router.get("/subtractions/:id", inventoryController.getSubtractionById); // Get single subtraction
router.delete("/subtractions/:id", inventoryController.deleteSubtraction); // Delete subtraction

export default router;
