import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Inventory } from "../models/inventory";
import { InventoryInput } from "../network/inventory_api";
import { useForm } from "react-hook-form";
import * as InventoryApi from "../network/inventory_api";
import TextInputField from "./from/TextInputField";

interface AddEditInventoryDialogProps {
    inventoryToEdit?: Inventory,
    onDismiss: () => void,
    onInventorySaved: (inventory: Inventory) => void,
}

const AddEditInventoryDialog = ({ inventoryToEdit, onDismiss, onInventorySaved }: AddEditInventoryDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InventoryInput>({
        defaultValues: {
            product_id: inventoryToEdit?.product_id || "",
            product_name: inventoryToEdit?.product_name || "",
            available_stock: inventoryToEdit?.available_stock || "",
        }
    });

    async function onSubmit(input: InventoryInput) {
        try {
            let inventoryResponse: Inventory;
            if (inventoryToEdit) {
                inventoryResponse = await InventoryApi.updateInventory(inventoryToEdit._id, input);
            }
            else {
                inventoryResponse = await InventoryApi.createInventory(input);
            }

            onInventorySaved(inventoryResponse);

        } catch (error) {
            console.error(error);
            alert(error);
        }

    }
    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {inventoryToEdit ? "Edit inventory" : "Add inventory"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditInventoryForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="product_id"
                        label="Product_id"
                        type="text"
                        placeholder="Product Id"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.product_id}
                    />

                    <TextInputField
                        name="product_name"
                        label="Product_name"
                        type="text"
                        placeholder="Product Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.product_name}
                    />

                    <TextInputField
                        name="available_stock"
                        label="Available_stock"
                        type="number"
                        placeholder="Available Stock"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.available_stock}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditInventoryForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditInventoryDialog;