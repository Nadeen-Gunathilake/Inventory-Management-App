import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { Inventory as InventoryModel } from "../models/inventory";
import { formatDate } from "../utils/formatDate";
import {MdDelete} from "react-icons/md";


interface InventoryProps {
    inventory: InventoryModel,
    onInventoryClicked:(inventory:InventoryModel)=>void,
    onDeleteInventoryClicked:(inventory:InventoryModel)=>void,
    className?: string,
}

const Inventory = ({ inventory,onInventoryClicked,onDeleteInventoryClicked, className }: InventoryProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt
    } = inventory;

    let createdUpdatedText:string;
    if(updatedAt>createdAt){
        createdUpdatedText="Updated: " + formatDate(updatedAt);
    }else{
        createdUpdatedText="Created: " + formatDate(createdAt);
    }

    return (
        <Card 
        className={`${styles.inventoryCard} ${className}`}
        onClick={()=>onInventoryClicked(inventory)} >
           
                        <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                    className="text-muted ms-auto"
                    onClick={(e)=>{
                        onDeleteInventoryClicked(inventory);
                        e.stopPropagation();
                    }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                {createdUpdatedText}
            </Card.Footer>
        </Card >

    )

}

export default Inventory;