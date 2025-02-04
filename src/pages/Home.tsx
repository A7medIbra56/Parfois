import { Carousel, ProductsShow } from "@components/index";
import { Card, Container } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Card.Body>
        <Carousel />
        <Container>
        <ProductsShow/>
        </Container>
      </Card.Body>
    </div>
  );
}
