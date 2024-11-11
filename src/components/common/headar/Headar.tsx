import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";
import { HeaderBasket } from "@components/index";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <img src="src\assets\logo.svg" alt="000" />
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto m-5 my-lg-0"
              style={{ maxHeight: "300px" }}
              navbarScroll
            >
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link  as={NavLink} to="/cart">Cart</Nav.Link>
              <Nav.Link  as={NavLink} to="/wishlist">Wishlist</Nav.Link>
              <Nav.Link  as={NavLink} to="/products">Products</Nav.Link>
              <Nav.Link  as={NavLink} to="/categories">Categories</Nav.Link>
              <Nav.Link  as={NavLink} to="/brands">Brands</Nav.Link>
            </Nav>
            <Form
              style={{
                borderRadius: "0",
                display: "flex",
                borderBottom: "2px solid black",
              }}
            >
              <InputGroup.Text
                id="search-icon"
                style={{
                  background: "white",
                  border: "none",
                  borderRadius: "0px",
                }}
              >
                <BsSearch />
              </InputGroup.Text>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{
                    boxShadow: "none",
                    border: "none",
                    borderRadius: "0px",
                  }}
                />
              </InputGroup>
            </Form>
        
          <div style={{margin:"10px"}}> <HeaderBasket/></div>
           
            <Nav
              className=" my-lg-0"
              style={{ maxHeight: "100px" , fontSize:"20px"}}
            >
              <Nav.Link as={NavLink} to="login">Login</Nav.Link>
              <Nav.Link as={NavLink} to="register">Register</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
