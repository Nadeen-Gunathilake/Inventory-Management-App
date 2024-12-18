import express from "express";
import * as InventoryController from "../controllers/inventory";

const router = express.Router();

router.get("/",InventoryController.getInventory);

router.get("/:inventoryId",InventoryController.getInventoryItem);

router.post("/",InventoryController.createInventory);

router.patch("/:noteId",InventoryController.updateInventory);

router.delete("/:noteId",InventoryController.deleteInventory);

export default router;