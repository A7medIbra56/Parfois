import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import styles from "./CartPage.module.css";

interface CartItem {
  price: number;
  _id: string;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCart = async () => {
      axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            token: localStorage.getItem("userToken") || "",
          },
        })
        .then((res) => {
          console.log("API Response:", res.data.data.products);
         setCartItems(res.data.data.products)
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    fetchCart();
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className={styles.cartContainer}>
      <h2 className="mb-4 text-center">🛒 Products in Your Cart</h2>
      <Row>
        {cartItems.map((item) => (
          <Col md={6} lg={4} key={item._id} className="mb-4">
            <Card className={styles.cartCard}>
              <Card.Img variant="top" src={item.product.imageCover} />
              <Card.Body>
                <Card.Title>{item.product.title}</Card.Title>
                <Card.Text>
                  Price: <strong>{item.price * item.count} EGP</strong>
                </Card.Text>
                <Card.Text>
                  Quantity: <strong>{item.count}</strong>
                </Card.Text>
                <Button variant="danger" size="sm">
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default CartPage;
