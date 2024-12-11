import { motion, AnimatePresence } from "framer-motion";
import styles from "./CartDrawer.module.scss";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  itemCount: number;
}

const CartDrawer = ({ isOpen, onClose, itemCount }: CartDrawerProps) => {
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
            {itemCount === 0 ? <p>Seu carrinho está vazio :(</p> : <p>Você tem {itemCount} item(ns) no carrinho.</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
