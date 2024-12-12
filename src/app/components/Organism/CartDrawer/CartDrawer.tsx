import { motion } from "framer-motion";
import styles from "./CartDrawer.module.scss";
import { useCart } from "../../../lib/context/CartContext";
import { X } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { products, total, increaseQuantity, decreaseQuantity, removeProduct } = useCart();
  return (
    <>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.div
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <h2>Seu Carrinho</h2>
        {products.length === 0 ? (
          <p>O carrinho está vazio!</p>
        ) : (
          <>
            {products.map((product) => (
              <div key={product.id} className={styles.product}>
                <img src={product.imageUrl} alt={product.productName} />
                <div>
                  <p>{product.productName}</p>
                  <p>R${product.price}</p>
                  <div className={styles.quantity}>
                    <button onClick={() => decreaseQuantity(product.id)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product.id)}>+</button>
                  </div>
                  <button onClick={() => removeProduct(product.id)}>Remover</button>
                </div>
              </div>
            ))}
            <div className={styles.total}>
              <p>Total: R${total.toFixed(2)}</p>
            </div>
          </>
        )}
        <button className={styles.close} onClick={onClose}>
          <X />
        </button>
      </motion.div>
    </>
  );
};

export default CartDrawer;
