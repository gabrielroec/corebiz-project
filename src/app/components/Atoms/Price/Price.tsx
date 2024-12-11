import styles from "./Price.module.scss";

interface PriceProps {
  listPrice?: number;
  price: number;
  installments?: {
    quantity: number;
    value: number;
  }[];
}
const Price = ({ listPrice, price, installments }: PriceProps) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className={styles.container}>
      {listPrice && <span className={styles.listPrice}>de {formatPrice(listPrice)}</span>}
      <span className={styles.price}>por {formatPrice(price)}</span>
      {installments && installments[0] && (
        <span className={styles.installments}>
          ou em {installments[0].quantity}x de {formatPrice(installments[0].value)}
        </span>
      )}
    </div>
  );
};

export default Price;
