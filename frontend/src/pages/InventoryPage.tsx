import { Container } from "react-bootstrap";
import InventoryAdminPageLoggedInView from "../components/InventoryAdminPageLoggedInView";
import InventoryManagerPageLoggedInView from "../components/InventoryManagerLoggedInView";
import InventoryPageLoggedOutView from "../components/InventoryPageLoggedOutView";
import { User } from "../models/user";
import StyleUtils from "../styles/utils.module.css";

interface InventoryPageProps {
  loggedInUser: User | null,
}
const InventoryPage = ({ loggedInUser }: InventoryPageProps) => {
  return (
    <Container className="space">
      <>
        {loggedInUser ? (
          loggedInUser.type === "Admin" ? (
            <InventoryAdminPageLoggedInView />
          ) : loggedInUser.type === "Manager" ? (
            <InventoryManagerPageLoggedInView />
          ) : (
            <InventoryPageLoggedOutView />
          )
        ) : (
          <InventoryPageLoggedOutView />
        )}
      </>
    </Container>
  );
}

export default InventoryPage;