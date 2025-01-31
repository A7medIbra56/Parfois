import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { ApiGetCategories } from "@services/index";
import { Nav, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { NavLink } from "react-router-dom";
interface Category {
  image: string;
  name: string;
  _id: number;
}

const Categories: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await ApiGetCategories();
        setData(data);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <section className={styles.cardContainer}>
      {loading ? (
        <div className={styles.spinnerContainer}>
          <Spinner animation="grow" variant="secondary" />
        </div>
      ) : (
        data.map((item) => (
          <Nav.Link as={NavLink} to={`/itemDetails/${item._id}`}>
            <Card key={item._id} className={styles.customCard}>
              <Card.Img variant="top" src={item.image} />
              <Card.Body className={styles.customCardBody}>
                <Card.Title>{item.name}</Card.Title>
              </Card.Body>
            </Card>
          </Nav.Link>
        ))
      )}
    </section>
  );
};

export default Categories;
