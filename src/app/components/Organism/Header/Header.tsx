import { useEffect, useState } from "react";

import styles from "./Header.module.scss";
import menu from "../../../../assets/menu.svg";
import Cart from "../../Atoms/Cart/Cart";
import SearchInput from "../../Atoms/SearchInput/SearchInput";
import Logo from "../../Atoms/Logo/Logo";
import UserMenu from "../../Atoms/UserMenu/UserMenu";

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  console.log(windowWidth);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        {windowWidth < 1025 && <img src={menu} alt="Menu" />}
        <Logo />
        {windowWidth > 1025 && (
          <div className={styles.center}>
            <SearchInput placeholder="O que está procurando?" />
          </div>
        )}

        <div className={styles.rightSide}>
          {windowWidth > 1025 && <UserMenu />}

          <Cart />
        </div>
      </header>
      {windowWidth < 1025 && (
        <div className={styles.center}>
          <SearchInput placeholder="O que está procurando?" />
        </div>
      )}
    </div>
  );
};

export default Header;
