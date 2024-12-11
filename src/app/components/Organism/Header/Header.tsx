import { useState } from "react";
import CartButton from "../../Atoms/CartButton/CartButton";
import Logo from "../../Atoms/Logo/Logo";
import SearchInput from "../../Atoms/SearchInput/SearchInput";
import UserMenu from "../../Molecules/UserMenu/UserMenu";
import styles from "./Header.module.scss";
import CartDrawer from "../CartDrawer/CartDrawer";

const Header = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  const itemCount = 0;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Logo />
          <div className={styles.search}>
            <SearchInput placeholder="O que está procurando?" />
          </div>
          <div className={styles.actions}>
            <UserMenu />
            <CartButton itemCount={itemCount} onClick={() => setCartOpen(true)} />
          </div>
        </div>
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={() => setCartOpen(false)} itemCount={itemCount} />
    </>
  );
};

export default Header;
