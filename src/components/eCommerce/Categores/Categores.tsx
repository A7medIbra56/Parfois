import Card from "react-bootstrap/Card";
import { ApiGetCategories } from "@services/apiGetCategories/ApiGetCategories";
import { useEffect, useState } from "react";

function Categores() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiGetCategories();
        setData(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
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
}
export default Categores;
