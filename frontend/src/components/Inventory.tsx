import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Table } from "react-bootstrap";
import { Inventory as InventoryModel } from "../models/inventory";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";


interface InventoryProps {
    inventory: InventoryModel,
    onInventoryClicked: (inventory: InventoryModel) => void,
    onDeleteInventoryClicked: (inventory: InventoryModel) => void,
    className?: string,
}

const Inventory = ({ inventory, onInventoryClicked, onDeleteInventoryClicked, className }: InventoryProps) => {
    const {
        product_id,
        product_name,
        available_stock,
        createdAt,
        updatedAt
    } = inventory;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formatDate(createdAt);
    }
    /*onClick={()=>onInventoryClicked(inventory)}*/
    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Product ID</th>
            <th scope="col">Product Name</th>
            <th scope="col">Available Stock</th>
            <th scope="col">Date of Entry</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>

    )

}

export default Inventory;