import { Container } from "react-bootstrap";
import InventoryPageLoggedInView from "../components/InventoryAdminPageLoggedInView";
import InventoryPageLoggedOutView from "../components/NotesPageLoggedOutView";
import styles from "../styles/NotesPage.module.css";
import { User } from "../models/user";

interface InventoryPageProps{
    loggedInUser:User | null,
}
const InventoryPage = ({loggedInUser}:InventoryPageProps) => {
    return ( 
        <Container className={styles.inventoriesPage}>

        <>
          {loggedInUser
            ? <InventoryPageLoggedInView />
            : <InventoryPageLoggedOutView />
          }
        </>
      </Container>
     );
}
 
export default InventoryPage;