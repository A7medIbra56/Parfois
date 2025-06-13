import { FaShoppingCart } from "react-icons/fa";
import styles from "./styles.module.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const { container, badge, icon } = styles;
const HeaderBasket = () => {
  return (
    <Nav.Link as={NavLink} to="/cart">
      <div className={container}>
        <FaShoppingCart className={icon} />
        <span className={badge}>0</span>
      </div>
    </Nav.Link>
  );
};
export default HeaderBasket;
