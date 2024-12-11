import { Product } from "../../../lib/types";
import Price from "../../Atoms/Price/Price";
import StarRating from "../../Atoms/StarRating/StarRating";
import styles from "./ProductCard.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import badge from "../../../../assets/badge.svg";
import { useCart } from "../../../lib/context/CartContext";
interface ProductCardProps {
  product: Product;
  onBuy: (productId: number) => void;
}
const ProductCard = ({ product }: ProductCardProps) => {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useCart();
  return (
    <motion.div
      className={styles.productCard}
      onHoverStart={() => setHovered(true)} // Quando o mouse entra
      onHoverEnd={() => setHovered(false)} // Quando o mouse sai
    >
      <div className={styles.productImageWrapper}>
        {product.listPrice && (
          <div className={styles.badge}>
            <img src={badge} alt="Desconto" />
          </div>
        )}
        <img src={product.imageUrl} alt={product.productName} className={styles.productImage} loading="lazy" />
      </div>
      <div>
        <div className={styles.productInfo}>
          <h3 className={styles.productName}>{product.productName}</h3>
          <StarRating rating={product.stars} maxRating={5} />
          <Price listPrice={product.listPrice} price={product.price} installments={product.installments} />
          <motion.button
            onClick={() => addToCart(product)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.1 }}
          >
            Comprar
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
