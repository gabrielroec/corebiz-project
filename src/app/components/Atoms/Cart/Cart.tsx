import styles from "./Cart.module.scss";
import cart from "../../../../assets/cartIcon.svg";
const Cart = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.cart} onClick={onClick}>
      <img src={cart} alt="" />
      <span>0</span>
    </div>
  );
};

export default Cart;
