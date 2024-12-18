import { InferSchemaType, model, Schema } from "mongoose";

const inventorySchema=new Schema({
    product_id: {type: String, required:true, unique: true }, 
    product_name: {type: String, required:true },              
    available_stock: {type: Number, required:true }

},{timestamps:true});

type Inventory  = InferSchemaType<typeof inventorySchema>;

export default model<Inventory>("Inventory",inventorySchema);
