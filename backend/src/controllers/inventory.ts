import { RequestHandler } from "express";
import InventoryModel from "../models/inventory";
import createHttpError from "http-errors";
import mongoose from "mongoose";



export const getInventory:RequestHandler= async (req, res,next) => {

    try{
        const inventory=await InventoryModel.find().exec();
        res.status(200).json(inventory);
    }catch(error){
        next(error);
    }
    
};

export const getInventoryItem: RequestHandler=async (req,res,next)=>{
    const inventoryId=req.params.inventoryId;
    
    try {
      

        if(!mongoose.isValidObjectId(inventoryId)){
            throw createHttpError(400,"Invalid inventory id");
        }

        const inventoryItem =await InventoryModel.findById(inventoryId).exec();

        if (!inventoryItem){
            throw createHttpError(404,"InventoryItem not found");
        }


        res.status(200).json(inventoryItem);
        
    } catch (error) {
        next(error);
    }
};

interface CreateInventoryBody {
    product_id?: string;
    product_name?: string;
    available_stock?: number;
}

interface CreateInventoryBody {
    product_id?: string;
    product_name?: string;
    available_stock?: number;
}

export const createInventory: RequestHandler<unknown, unknown, CreateInventoryBody, unknown> = async (req, res, next) => {
    const product_id = req.body.product_id;
    const product_name = req.body.product_name;
    const available_stock = req.body.available_stock;

    try {
        if (!product_id || !product_name || available_stock === undefined) {
            throw createHttpError(400, "Product must have a product_id ,product_name and available_stock.");
        }

        const newInventory = await InventoryModel.create({
            product_id: product_id,
            product_name: product_name,
            available_stock: available_stock,
        });

        res.status(201).json(newInventory);
    } catch (error) {
        next(error);
    }
};


interface UpdateInventoryParams {
    inventoryId: string;
}

interface UpdateInventoryBody {
    product_id?: string;
    product_name?: string;
    available_stock?: number;
}

export const updateInventory: RequestHandler<UpdateInventoryParams, unknown, UpdateInventoryBody, unknown> = async (req, res, next) => {
    const inventoryId = req.params.inventoryId;
    const newProduct_id = req.body.product_id;
    const newProduct_name = req.body.product_name;
    const newAvailable_stock = req.body.available_stock;

    try {
        if (!mongoose.isValidObjectId(inventoryId)) {
            throw createHttpError(400, "Invalid inventory item_id");
        }

        if (!newProduct_id || !newProduct_name || newAvailable_stock === undefined) {
            throw createHttpError(400, "Product must have a product_id, product_name, and available_stock.");
        }

        const inventoryItem = await InventoryModel.findById(inventoryId).exec();

        if (!inventoryItem) {
            throw createHttpError(404, "Inventory item not found");
        }

        inventoryItem.product_id = newProduct_id;
        inventoryItem.product_name = newProduct_name;
        inventoryItem.available_stock = newAvailable_stock;

        const updatedInventory = await inventoryItem.save();

        res.status(200).json(updatedInventory);
    } catch (error) {
        next(error);
    }
};

export const deleteInventory: RequestHandler = async (req, res, next) => {
    const inventoryId = req.params.inventoryId;

    try {
        if (!mongoose.isValidObjectId(inventoryId)) {
            throw createHttpError(400, "Invalid inventory item id");
        }

        const inventoryItem = await InventoryModel.findById(inventoryId).exec();

        if (!inventoryItem) {
            throw createHttpError(404, "Inventory item not found");
        }

        await inventoryItem.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
