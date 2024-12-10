import ShoppingCart from "../../../../assets/cartIcon.svg";
import styles from "./CartButton.module.scss";

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton = ({ itemCount, onClick }: CartButtonProps) => {
  return (
    <button className={styles.button} aria-label="Carrinho de compras" onClick={onClick}>
      <img src={ShoppingCart} alt="Carrinho" />
      {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
    </button>
  );
};

export default CartButton;
