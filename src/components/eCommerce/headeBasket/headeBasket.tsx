import { FaShoppingCart } from 'react-icons/fa';
import styles from './styles.module.css'; 
const {container , badge , icon } = styles
const HeaderBasket = () => {
  return (
    <div className={container}>
      <FaShoppingCart className={icon} />
        <span className={badge}>0</span>
    </div>
  );
};
export default HeaderBasket;
