import { Search } from "lucide-react";
import styles from "./SearchInput.module.scss";
interface SearchInputProps {
  placeholder?: string;
}

const SearchInput = ({ placeholder }: SearchInputProps) => {
  return (
    <div className={styles.wrapper}>
      <input className={styles.input} type="text" placeholder={placeholder} />

      <button className={styles.button} aria-label="Buscar">
        <Search className={styles.icon} />
      </button>
    </div>
  );
};

export default SearchInput;
