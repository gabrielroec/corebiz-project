import { motion } from "framer-motion";
import styles from "./CartDrawer.module.scss";
import { useCart } from "../../../lib/context/CartContext";
import { Minus, Plus, X } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatToBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { products, total, increaseQuantity, decreaseQuantity, removeProduct, allQuantity } = useCart();
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
        <div className={styles.cartHeader}>
          <h2>Seu Carrinho</h2>
          {allQuantity == 1 ? <span>{allQuantity} Item</span> : <span>{allQuantity} Itens</span>}
        </div>
        {products.length === 0 ? (
          <div className={styles.empty}>
            <p>O carrinho está vazio!</p>
            <button className={styles.continue + " " + styles.buttonEmpty} onClick={onClose}>
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className={styles.products}>
              {products.map((product) => (
                <div key={product.id} className={styles.product}>
                  <img src={product.imageUrl} alt={product.productName} />
                  <div className={styles.details}>
                    <p className={styles.productName}>{product.productName}</p>
                    <p className={styles.price}>{formatToBRL(product.price / 100)} / cada</p>
                    <div className={styles.actions}>
                      <div className={styles.quantity}>
                        <button onClick={() => decreaseQuantity(product.id)}>
                          <Minus />
                        </button>
                        <span>{product.quantity}</span>
                        <button onClick={() => increaseQuantity(product.id)}>
                          <Plus />
                        </button>
                      </div>
                      <button onClick={() => removeProduct(product.id)}>Remover</button>
                    </div>
                  </div>
                </div>
              ))}
              <div className={styles.line} />
            </div>
            <div className={styles.totalContainer}>
              <div className={styles.total}>
                <p>Total:</p>
                <p> {formatToBRL(total / 100)}</p>
              </div>
              <button className={styles.checkout}>Ir para o checkout</button>
              <button className={styles.continue} onClick={onClose}>
                Continuar comprando
              </button>
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
