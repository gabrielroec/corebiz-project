import { Search } from "lucide-react";
import styles from "./SearchInput.module.scss";
import { useState } from "react";

interface SearchInputProps {
  placeholder: string;
}
const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [onFocus, setOnFocus] = useState(false);

  return (
    <div
      onClick={() => setOnFocus(true)}
      onBlur={() => setOnFocus(false)}
      className={styles.searchWrapper + " " + (onFocus ? styles.focused : "")}
    >
      <input type="text" placeholder={placeholder} />
      <Search className={styles.search} />
    </div>
  );
};

export default SearchInput;
