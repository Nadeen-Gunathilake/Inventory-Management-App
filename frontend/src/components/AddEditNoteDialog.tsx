import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Inventory } from "../models/inventory";
import { InventoryInputInput } from "../network/inventory_api";
import { useForm } from "react-hook-form";
import * as InventoryApi from "../network/inventory_api";
import TextInputField from "./from/TextInputField";

interface AddEditInventoryDialogProps {
    InventoryToEdit?: Inventory,
    onDismiss: () => void,
    onNoteSaved: (inventory: Inventory) => void,
}

const AddEditInventoryDialog = ({ inventoryToEdit, onDismiss, onInventorySaved }: AddEditInventoryDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InventoryInput>({
        defaultValues: {
            title: inventoryToEdit?.title || "",
            text: inventoryToEdit?.text || "",
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
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        as="textarea"
                        rows={5}
                        placeholder="Text"
                        register={register}
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