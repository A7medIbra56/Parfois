import styles from "./styles.module.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import { BsSearch } from "react-icons/bs";
import { HeaderBasket, PersonIcon , Nav_Link } from "@components/index";

function Header() {
 return (
    <header>
      <Navbar>
        <div className={styles.navbarParfois}>
          <img
            src="src/assets/logo.png"
            alt="logo"
            style={{
              width: "150px",
              height: "auto",
            }}
          />
        </div>
      </Navbar>
      <Navbar expand="lg" className={`${styles.navbarCustom} bg-body-tertiary`}>
        <Container>
          <Navbar.Collapse
            id="navbarScroll"
            className="d-flex justify-content-between w-100"
          >
            <div className="d-flex ms-auto align-items-center">
              <Navbar >
                <img
                  src="src/assets/logo.png"
                  alt="logo"
                  className={styles.navbarParfoisI}
                  style={{
                    width: "150px",
                    height: "auto",
                    marginRight: "200px",
                  }}
                />
              </Navbar>
              <Form
                className={styles.formSearch}
                style={{
                  borderRadius: "0",
                  display: "flex",
                  borderBottom: "2px solid black",
                  marginRight: "10px",
                }}
              >
                <div></div>
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
              <div className={styles.towIcon}>
                <div style={{ margin: "0 10px" }}>
                  <HeaderBasket />
                </div>
                <Nav
                  className="my-lg-0"
                  style={{ maxHeight: "100px", fontSize: "20px" }}
                >
                  <div>
                    <PersonIcon />
                  </div>
                </Nav>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Nav_Link/>
    </header>
  );
}
export default Header;
