import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

function Nav_Link() {
 return (
    <header>
      <Nav
        className="bg-body-tertiary me-auto mt-5 my-lg-0 d-flex justify-content-center"
        style={{ maxHeight: "300px" }}
      >
        <Nav.Link as={NavLink} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/cart">
          Cart
        </Nav.Link>
        <Nav.Link as={NavLink} to="/wishlist">
          Wishlist
        </Nav.Link>
        <Nav.Link as={NavLink} to="/products">
          Products
        </Nav.Link>
        <Nav.Link as={NavLink} to="/categories">
          Categories
        </Nav.Link>
        <Nav.Link as={NavLink} to="/brands">
          Brands
        </Nav.Link>
      </Nav>
    </header>
  );
}
export default Nav_Link;
