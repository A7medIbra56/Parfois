import { FaShoppingCart } from "react-icons/fa";
import styles from "./styles.module.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { UserContext } from "@context/UserContext";
import { useContext } from "react";
const { container, badge, icon } = styles;
const HeaderBasket = () => {
  let {counteCart}  :any = useContext(UserContext)
  return (
    <Nav.Link as={NavLink} to="/cart">
      <div className={container}>
        <FaShoppingCart className={icon} />
        <span className={badge}>{counteCart}</span>
      </div>
    </Nav.Link>
  );
};
export default HeaderBasket;
