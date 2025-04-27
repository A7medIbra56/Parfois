import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "./styles.module.css";
import { ApiGetBrands } from "@services/index";

interface Category {
  image: string;
  name: string;
  id: number;
}

const Brand: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiGetBrands();
        setData(result.data);
        setLoading(true);
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
        <div className={styles.spinner}></div>
      </div>
      ) : (
        data.map((item, i) => (
          <Card key={i} className={styles.customCard}>
            <Card.Img variant="top" src={item.image} />
          </Card>
        ))
      )}
    </section>
  );
};

export default Brand;
