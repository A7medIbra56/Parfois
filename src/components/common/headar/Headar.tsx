import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";
import { HeaderBasket, PersonIcon, Nav_Link } from "@components/index";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage")); 
    navigate("/login");
  };

  return (
    <header>
      <Navbar>
        <div className={styles.navbarParfois}>
          <img src="assets/logo.png" alt="logo" />
        </div>
      </Navbar>

      <Navbar expand="lg" className={`${styles.navbarCustom} bg-body-tertiary`}>
        <Container>
          <Navbar.Collapse
            id="navbarScroll"
            className="d-flex justify-content-between w-100"
          >
            <div className="d-flex ms-auto align-items-center">
              <Navbar>
                <img
                  src="assets/logo.png"
                  alt="logo"
                  className={styles.navbarParfoisI}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginRight: "200px",
                  }}
                />
              </Navbar>
              <Form className={styles.formSearch}>
                <InputGroup.Text className={styles.searchIcon}>
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
              <div className={styles.towIcon}>
                <div style={{ margin: "0 10px" }}>
                  <HeaderBasket />
                </div>
                <Nav className="my-lg-0">
                  <div
                    className={styles.personIconContainer}
                    onClick={() => setShowLoginOptions(!showLoginOptions)}
                  >
                    <PersonIcon />
                  </div>
                </Nav>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Nav_Link />

      {showLoginOptions && (
        <div className={styles.dropdownMenu}>
          {isLoggedIn ? (
            <Nav.Link as="button" onClick={handleLogout} className={styles.dropdownItem}>
              Logout
            </Nav.Link>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" className={styles.dropdownItem}>
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" className={styles.dropdownItem}>
                Register
              </Nav.Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
