import { motion } from "framer-motion"; // Importando o Framer Motion
import styles from "./CartDrawer.module.scss";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
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
        <p>O carrinho está vazio!</p>
        <button onClick={onClose}>Fechar</button>
      </motion.div>
    </>
  );
};

export default CartDrawer;
