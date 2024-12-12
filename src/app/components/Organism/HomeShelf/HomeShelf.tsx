import SectionTitle from "../../Atoms/SectionTitle/SectionTitle";
import styles from "./HomeShelf.module.scss";
const HomeShelf = () => {
  return (
    <div className={styles.container}>
      <SectionTitle title="Mais Vendidos" />
    </div>
  );
};

export default HomeShelf;
