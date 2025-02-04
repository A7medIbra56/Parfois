import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Nav,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.css";
import { ApiGetProducts } from "@services/index";
import { AiFillHeart, AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { RiApps2Fill } from "react-icons/ri";

interface Product {
  id: string;
  imageCover: string;
  title: string;
  price: number;
  category: {
    _id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const ProductsShow: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(3000000);
  const [sortOption, setSortOption] = useState<string>("");
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await ApiGetProducts();
        const products: Product[] = response.data;
        setData(products);

        const uniqueCategories = Array.from(
          new Map(
            products.map((item) => [item.category._id, item.category])
          ).values()
        ).map((category: { _id: string; name: string }) => ({
          id: category._id,
          name: category.name,
        }));

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    );
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(event.target.value));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  let filteredProducts = data.filter(
    (product) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category._id)) &&
      product.price <= priceRange
  );

  if (sortOption === "lowToHigh") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "highToLow") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <Container fluid className={styles.productList}>
      <Row>
        <div
          className={`${styles.filterIcon} d-md-none`}
          onClick={toggleSidebar}
        >
          <RiApps2Fill size={24} />
        </div>

        <Col
          md={3}
          className={`${styles.sidebar} ${
            showSidebar ? styles.showSidebar : styles.hideSidebar
          }`}
        >
          <div className={styles.closeButton} onClick={toggleSidebar}>
            <AiOutlineClose size={24} />
          </div>

          <h2>Product</h2>
          {categories.map((item) => (
            <div key={item.id}>
              <label>
                <input
                  type="checkbox"
                  value={item.id}
                  checked={selectedCategories.includes(item.id)}
                  onChange={() => handleCategoryChange(item.id)}
                />
                {item.name}
              </label>
            </div>
          ))}

          <div className="filter mb-4">
            <h5>Price</h5>
            <Form.Range
              min={0}
              max={300000}
              value={priceRange}
              onChange={handlePriceChange}
            />
            <div className="d-flex justify-content-between">
              <span>0 EGP</span>
              <span>{priceRange} EGP</span>
            </div>
          </div>

          <div className="filter mb-4">
            <h5>Sort by</h5>
            <Form.Check
              type="radio"
              name="sort"
              label="Most Popular"
              value="popular"
              checked={sortOption === "popular"}
              onChange={handleSortChange}
            />
            <Form.Check
              type="radio"
              name="sort"
              label="From Low To High"
              value="lowToHigh"
              checked={sortOption === "lowToHigh"}
              onChange={handleSortChange}
            />
            <Form.Check
              type="radio"
              name="sort"
              label="From High To Low"
              value="highToLow"
              checked={sortOption === "highToLow"}
              onChange={handleSortChange}
            />
          </div>
        </Col>
        <Col md={9}>
          {loading ? (
           <div className={styles.spinnerContainer}>
           <div className={styles.spinner}></div>
         </div>
          ) : (
            <Row className="g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <Col key={item.id} xs={12} sm={6} md={4} lg={3}>
                    <Nav.Link as={NavLink} to={`/productDetails/${item.id}`}>
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
                        </Card.Body>
                      </Card>
                    </Nav.Link>
                  </Col>
                ))
              ) : (
                <p className="text-center">No products found.</p>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsShow;
