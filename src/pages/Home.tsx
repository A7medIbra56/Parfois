import { Carousel, Categories } from "@components/index";
import { Card, Container } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Card.Body>
        <Carousel />
        <Container>
          <Categories />
        </Container>
      </Card.Body>
    </div>
  );
}
