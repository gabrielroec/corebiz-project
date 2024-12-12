import styles from "./Price..module.scss";

interface PriceProps {
  listPrice: number;
  price: number;
  installments: Array<{
    quantity: number;
    value: number;
  }>;
}

function formatToBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const Price = ({ listPrice, price, installments }: PriceProps) => {
  const dynamicStyle = {
    marginTop: listPrice ? "0px" : "23px",
  };

  return (
    <>
      {listPrice && (
        <div className={styles.listPriceContainer}>
          <span className={styles.listPrice}>de {formatToBRL(listPrice / 100)}</span>
        </div>
      )}
      <div style={dynamicStyle}>
        <span className={styles.price}>por {formatToBRL(price / 100)}</span>
      </div>
      {installments.length > 0 && (
        <div className={styles.installmentsContainer}>
          <span>
            ou em {installments[0].quantity}x de {formatToBRL(installments[0].value / 100)}
          </span>
        </div>
      )}
    </>
  );
};

export default Price;
