import { Container } from "react-bootstrap";
import InventoryPageLoggedInView from "../components/InventoryAdminPageLoggedInView";
import InventoryPageLoggedOutView from "../components/InventoryPageLoggedOutView";
import { User } from "../models/user";
import styleUtils from "../styles/utils.module.css";

interface InventoryPageProps{
    loggedInUser:User | null,
}
const InventoryPage = ({loggedInUser}:InventoryPageProps) => {
    return ( 
        <Container className="space">

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