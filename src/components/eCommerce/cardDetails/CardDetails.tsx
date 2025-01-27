import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';
import { ApiGitItemProduct } from '@services/index';
import { Spinner } from 'react-bootstrap';

interface Product {
  id: number;
  title: string;
  price: number;
  imageCover: string;
}

const CardDetails: React.FC = () => {
 const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await ApiGitItemProduct();
        setData(result.data);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);



  return (
    <div className={styles.productList}>
      <div className={styles.sidebar}>
        <h2>Watches</h2>
        <ul>
          <li>All Products</li>
          <li>Silver Watches</li>
          <li>Casual Watches</li>
        </ul>
        <div className="filter">
          <h3>Price</h3>
          <p>Min. 0 EGP</p>
          <p>Max. 3000 EGP</p>
          <input type="range" min="0" max="3000" />
        </div>
        <div className="filter">
          <h3>Size</h3>
          <label>
            <input type="checkbox" />
            One Size
          </label>
        </div>
        <div className="filter">
          <h3>Sort by</h3>
          <label>
            <input type="radio" name="sort" />
            Most Popular
          </label>
          <label>
            <input type="radio" name="sort" />
            From Low To High
          </label>
          <label>
            <input type="radio" name="sort" />
            From High To Low
          </label>
        </div>
      </div>
      {loading ? (<div className={styles.spinnerContainer}>
          <Spinner animation="grow" variant="secondary" />
        </div>) : (<div className={styles.products}>
        {data.map((item) => (
          <div key={item.id} className={styles.product}>
            <img src={item.imageCover} alt={item.title} />
            <h4>{item.title}</h4>
            <p>{item.price} EGP</p>
          </div>
        ))}
      </div>)}
      
    </div>
  );
};

export default CardDetails;