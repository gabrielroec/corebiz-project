import styles from "./Cart.module.scss";
import cart from "../../../../assets/cartIcon.svg";
import { useCart } from "../../../lib/context/CartContext";
const Cart = ({ onClick }: { onClick: () => void }) => {
  const { allQuantity } = useCart();
  return (
    <div className={styles.cart} onClick={onClick}>
      <img src={cart} alt="" />
      <span>{allQuantity}</span>
    </div>
  );
};

export default Cart;
