import styles from "./Cart.module.scss";
import cart from "../../../../assets/cartIcon.svg";
const Cart = () => {
  return (
    <div className={styles.cart}>
      <img src={cart} alt="" />
      <span>0</span>
    </div>
  );
};

export default Cart;
