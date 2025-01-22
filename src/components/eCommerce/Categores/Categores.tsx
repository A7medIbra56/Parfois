import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { ApiGetCategories } from "@services/apiGetCategories/ApiGetCategories";

// Define types for the category data structure
interface Category {
  image: string;
  name: string;
}

const Categories: React.FC = () => {
  const [data, setData] = useState<Category[]>([]); // State for category data
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<Error | null>(null); // State for error

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiGetCategories();
        setData(result.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {data.map((item, index) => (
        <Card key={index} style={{ width: "18rem", margin: "10px" }}>
          <Card.Img
            style={{ width: "18rem", height: "25rem" }}
            variant="top"
            src={item.image}
          />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </section>
  );
};

export default Categories;
