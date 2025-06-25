import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import styles from "./CartPage.module.css";
import { UserContext } from "@context/UserContext";

interface CartItem {
  price: number;
  _id: string;
  product: {
    id: string;
    title: string;
    imageCover: string;
    price: number;
  };
  count: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { setCounteCart } = useContext<any>(UserContext);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchCart = async () => {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("userToken") || "",
          },
        }
      );
    
    await  setCartItems(res.data.data.products);
    await  setCounteCart(res.data.data.products.reduce(
        (acc: number, item: any) => acc + item.count, 0))
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
// delete Cart
  const Delete_Cart = async (productId: string) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem("userToken") || "",
          },
        }
      );

     await fetchCart();
    } catch (error: any) {
      if (error.response) {
      }
    }
  };
// Updata Cuont
const updateCount = async (productId: string, newCount: number) => {
  try {
    await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count: newCount },
      {
        headers: {
          token: localStorage.getItem("userToken") || "",
        },
      }
    );
    fetchCart();
  } catch (error) {

  }
};

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
                <div className="d-flex align-items-center">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      updateCount(item.product.id, item.count - 1)
                    }
                    disabled={item.count <= 1}
                  >
                    -
                  </Button>
                  <span className="mx-2">{item.count}</span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() =>
                      updateCount(item.product.id, item.count + 1)
                    }
                  >
                    +
                  </Button>
                </div>

                <Button
                  onClick={() => Delete_Cart(item.product.id)}
                  variant="danger"
                  size="sm"
                >
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
