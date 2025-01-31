import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { ApiGitItemProduct } from "@services/index";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Product {
  id: string;
  imageCover: string;
  title: string;
  price: number;
}
const CardDetails: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<{ id: string }>();

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (!id) {
        console.error("ID is undefined");
        setLoading(false);
        return;
      }
  
      try {
        const result = await ApiGitItemProduct(id);
        setData(result.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    getData();
  }, [id]);

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  return (
    <Container fluid className={styles.productList}>
      <Row>
        <Col md={3} className={styles.sidebar}>
          <h2>Watches</h2>
          <ul className="list-unstyled">
            <li>All Products</li>
            <li>Silver Watches</li>
            <li>Casual Watches</li>
          </ul>
          <div className="filter mb-4">
            <h5>Price</h5>
            <Form.Range min={0} max={3000} />
            <div className="d-flex justify-content-between">
              <span>0 EGP</span>
              <span>3000 EGP</span>
            </div>
          </div>
          <div className="filter mb-4">
            <h5>Size</h5>
            <Form.Check type="checkbox" label="One Size" />
          </div>
          <div className="filter mb-4">
            <h5>Sort by</h5>
            <Form.Check type="radio" name="sort" label="Most Popular" />
            <Form.Check type="radio" name="sort" label="From Low To High" />
            <Form.Check type="radio" name="sort" label="From High To Low" />
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
            <div className={styles.spinnerContainer}>
              <Spinner animation="border" variant="secondary" />
            </div>
          ) : (
            <Row className="g-4">
              {data.map((item) => (
                <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card className={`${styles.productCard} h-100`}>
                    <div className={styles.cardImageWrapper}>
                      <Card.Img
                        variant="top"
                        src={item.imageCover}
                        alt={item.title}
                        className={styles.cardImage}
                      />
                      <div
                        className={styles.favoriteIcon}
                        onClick={() => toggleFavorite(item.id)}
                      >
                        {favorites.includes(item.id) ? (
                          <AiFillHeart color="red" size={24} />
                        ) : (
                          <AiOutlineHeart color="gray" size={24} />
                        )}
                      </div>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className={styles.cardTitle}>
                        {item.title}
                      </Card.Title>
                      <Card.Text className={styles.cardPrice}>
                        {item.price} EGP
                      </Card.Text>
                      <div className="mt-auto"></div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CardDetails;