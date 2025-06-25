import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import styles from "./WishlistProductD.module.css";

interface CartItem {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  price: number;
}

const WishlistProductD: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          const localFavs: string[] = JSON.parse(storedFavorites);
          const res = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
          const allProducts = res.data.data;
          const favProducts = allProducts.filter((p: any) => localFavs.includes(p.id));
          setCartItems(favProducts);
        } else {
          setCartItems([]);
        }
        return;
      }

      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token,
          },
        }
      );
      setCartItems(res.data.data);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const Delete_Cart = async (productId: string) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        const localFavs: string[] = JSON.parse(storedFavorites);
        const updated = localFavs.filter((id) => id !== productId);
        localStorage.setItem("favorites", JSON.stringify(updated));
        fetchCart();
      }
      return;
    }

    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token,
          },
        }
      );
      fetchCart();
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
    }
  };

  return (
    <Container className={styles.cartContainer}>
      <h2 className="mb-4 text-center">💖 Products in Your Wishlist</h2>
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Col md={6} lg={4} key={item._id} className="mb-4">
                <Card className={styles.cartCard}>
                  <Card.Img variant="top" src={item.imageCover} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      Price: <strong>{item.price} EGP</strong>
                    </Card.Text>
                    <Button
                      onClick={() => Delete_Cart(item.id)}
                      variant="danger"
                      size="sm"
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">No products in wishlist.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default WishlistProductD;
