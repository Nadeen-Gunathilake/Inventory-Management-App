import { useEffect, useState } from "react";
import { Button, Spinner } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { Inventory as InventoryModel } from '../models/inventory';
import { User as UserModel } from '../models/user';
import * as InventoryApi from "../network/inventory_api";
import * as UserApi from "../network/user_api";
import styles from "../styles/NotesPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditInventoryDialog from "./AddEditInventoryDialog";
import AddUserDialog from "./AddManagerDialog";
import Inventory from "./Inventory";

const InventoryAdminPageLoggedInView = () => {

    const [inventories, setInventory] = useState<InventoryModel[]>([]);
    const [users, setUsers] = useState<UserModel[]>([]);
    const [inventoriesLoading, setInventoryLoading] = useState(true);
    const [showInventoryLoadingError, setShowInventoryLoadingError] = useState(false);
    
    const [showAddInventoryManagerDialog, setShowAddInventoryManagerDialog] = useState(false);
    const [showAddInventoryDialog, setShowAddInventoryDialog] = useState(false);
   
    const [inventoryToEdit, setInventoryToEdit] = useState<InventoryModel | null>(null);

    useEffect(() => {
        async function loadInventory() {
            try {
                setShowInventoryLoadingError(false);
                setInventoryLoading(true);
                const inventories = await InventoryApi.fetchInventory();
                setInventory(inventories);
            } catch (error) {
                console.error(error);
                setShowInventoryLoadingError(true);
            } finally {
                setInventoryLoading(false);
            }
        }
        loadInventory();
    }, []);

   

    async function deleteInventory(inventory: InventoryModel) {
        try {
            await InventoryApi.deleteInventory(inventory._id);
            setInventory(inventories.filter(existingInventory => existingInventory._id !== inventory._id));
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <div className={`${styleUtils.blockCenter} ${styleUtils.flexCenter} ${styleUtils.buttonsContainer}`}>
                <Button 
                    className={`${styleUtils.button} ${styleUtils.sideBySideButton}`}
                    onClick={() => setShowAddInventoryDialog(true)}>
                    <FaPlus />
                    Add new item
                </Button>
                <Button
                    className={`${styleUtils.button} ${styleUtils.sideBySideButton}`}
                    onClick={() => setShowAddInventoryManagerDialog(true)}>
                    <FaPlus />
                    Add new Inventory Manager
                </Button>
            </div>

            {inventoriesLoading && <Spinner animation='border' variant='primary' />}
            {showInventoryLoadingError && <p>Something went wrong. Please refresh the page.</p>}

            {!inventoriesLoading && !showInventoryLoadingError &&
                (inventories.length > 0
                    ? <Inventory
                        inventories={inventories}
                        onInventoryClicked={setInventoryToEdit}
                        onDeleteInventoryClicked={deleteInventory}
                    />
                    : <p>You don't have any inventory items yet</p>
                )
            }

            {showAddInventoryDialog &&
                <AddEditInventoryDialog
                    onDismiss={() => setShowAddInventoryDialog(false)}
                    onInventorySaved={(newInventory) => {
                        setInventory([...inventories, newInventory]);
                        setShowAddInventoryDialog(false);
                    }}
                />
            }
            {inventoryToEdit &&
                <AddEditInventoryDialog
                    inventoryToEdit={inventoryToEdit}
                    onDismiss={() => setInventoryToEdit(null)}
                    onInventorySaved={(updatedInventory) => {
                        setInventory(inventories.map(existingInventory => 
                            existingInventory._id === updatedInventory._id ? updatedInventory : existingInventory
                        ));
                        setInventoryToEdit(null);
                    }}
                />
            }
             {showAddInventoryManagerDialog &&
                <AddUserDialog
                    onDismiss={() => setShowAddInventoryManagerDialog(false)}
                    onUserSaved={(newUser) => {
                        setUsers([...users, newUser]);
                        setShowAddInventoryManagerDialog(false);
                    }}
                />
            }
        </>
    );
}

export default InventoryAdminPageLoggedInView;
