"use client";
import styles from "./ProducCard.module.scss";
import Price from "../../Atoms/Price/Price";
import Rating from "../../Atoms/Rating/Rating";
import { useState } from "react";
interface ProductCardProps {
  productName: string;
  listPrice: number;
  price: number;
  stars: number;
  installments: Array<{
    quantity: number;
    value: number;
  }>;
  imageUrl: string;
  onBuy: () => void;
}

const ProductCard = ({ productName, listPrice, price, stars, installments, imageUrl, onBuy }: ProductCardProps) => {
  const [showBuyButton, setShowBuyButton] = useState(false);

  return (
    <div className={styles.productCardWrapper} onMouseEnter={() => setShowBuyButton(true)} onMouseLeave={() => setShowBuyButton(false)}>
      <img src={imageUrl} alt={productName} className={styles.productImage} />
      <div className={styles.productCard}>
        <h3 className={styles.productName}>{productName}</h3>
        <Rating stars={stars} />
        <Price listPrice={listPrice} price={price} installments={installments} />
        <button className={styles.buyButton + " " + (showBuyButton ? styles.show : "")} onClick={onBuy}>
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
