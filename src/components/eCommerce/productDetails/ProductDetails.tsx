import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import { ApiGetProductsOne } from "@services/index";
import { useParams } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  ratingsAverage: string;
  price: number;
  images: string[];
}

const ProductDetails: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const { data } = await ApiGetProductsOne(id);
          setProduct(data);
          setImages(data.images || []);
          setMainImage(data.images[0] || ""); 
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
  </div>;
  }

  return (
    <div className={styles.productContainer}>
      <div className={styles.imageGallery}>
        {mainImage && (
          <img
            src={mainImage}
            alt="Product"
            className={styles.mainImage}
          />
        )}
        <div className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className={styles.thumbnail}
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{product.title}</h1>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.ratings}>
          <span>★★★★☆</span>
          <span>({product.ratingsAverage})</span>
        </div>
        <div className={styles.price}>${product.price.toFixed(2)}</div>
        <div className={styles.quantitySelector}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>
        <button className={styles.addToCartButton}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;