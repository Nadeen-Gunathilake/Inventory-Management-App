import styleUtils from "../styles/utils.module.css";
import { Table } from "react-bootstrap";
import { Inventory as InventoryModel } from "../models/inventory";
import { formatDate } from "../utils/formatDate";
import { MdDelete, MdUpdate } from "react-icons/md";

interface InventoryProps {
    inventories: InventoryModel[],
    onInventoryClicked: (inventory: InventoryModel) => void,
    onDeleteInventoryClicked: (inventory: InventoryModel) => void,
    className?: string,
}

const Inventory = ({ inventories, onInventoryClicked, onDeleteInventoryClicked, className }: InventoryProps) => {
    return (
        <Table striped bordered hover className={className}>
            <thead>
                <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Product Name</th>
                    <th scope="col">Available Stock</th>
                    <th scope="col">Date of Entry</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {inventories.map((inventory) => {
                    const { product_id, product_name, available_stock, createdAt, updatedAt } = inventory;

                    const createdUpdatedText = updatedAt > createdAt
                        ? "Updated: " + formatDate(updatedAt)
                        : "Created: " + formatDate(createdAt);

                    return (
                        <tr key={product_id}>
                            <td>{product_id}</td>
                            <td>{product_name}</td>
                            <td>{available_stock}</td>
                            <td>{createdUpdatedText}</td>
                            <td className="space">
                                <MdDelete
                                    onClick={() => onDeleteInventoryClicked(inventory)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <MdUpdate
                                    onClick={() => onInventoryClicked(inventory)}
                                    style={{ cursor: 'pointer' }}
                                />

                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default Inventory;
