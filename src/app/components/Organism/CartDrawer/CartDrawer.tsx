import { motion, AnimatePresence } from "framer-motion";
import styles from "./CartDrawer.module.scss";
import { useCart } from "../../../lib/context/CartContext";
import { Minus, Plus, Trash } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  // Função para formatar o valor para o formato de moeda "R$"
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              &times;
            </button>
            <h2>Carrinho</h2>
            {cart.length === 0 ? (
              <p>Seu carrinho está vazio :(</p>
            ) : (
              <div>
                <ul className={styles.cartList}>
                  {cart.map((item, index) => (
                    <motion.li
                      key={item.product.productId}
                      className={styles.cartItem}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.2, duration: 0.2 }}
                    >
                      <div className={styles.itemDetails}>
                        <img src={item.product.imageUrl} alt={item.product.productName} loading="lazy" />
                        <div>
                          <p className={styles.itemName}>{item.product.productName}</p>
                          <p className={styles.itemPrice}>{formatPrice((item.product.price * item.quantity) / 100)}</p>
                          <div className={styles.quantityControls}>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.productId, item.quantity - 1)}
                              className={styles.actionButton}
                            >
                              <Minus size={10} />
                            </motion.button>
                            <motion.span
                              className={styles.quantity}
                              initial={{ scale: 1 }}
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.product.productId, item.quantity + 1)}
                              className={styles.actionButton}
                            >
                              <Plus size={10} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                      <div className={styles.itemActions}>
                        <button onClick={() => removeFromCart(item.product.productId)} className={styles.removeButton}>
                          <Trash />
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <div className={styles.cartSummary}>
                  <p>
                    <strong>Total:</strong> {formatPrice(getTotalPrice() / 100)}
                  </p>
                  <motion.button
                    className={styles.payButton}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert("Pagamento realizado!")}
                  >
                    Pagar
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
