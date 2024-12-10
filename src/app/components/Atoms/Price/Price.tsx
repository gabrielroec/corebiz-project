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
  return <div>Price</div>;
};

export default Price;
