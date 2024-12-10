import User from "../../../../assets/UserIcon.svg";
import styles from "./UserMenu.module.scss";

const UserMenu = () => {
  return (
    <button className={styles.button}>
      <img src={User} alt="Perfil" />
      <span className={styles.text}>Minha conta</span>
    </button>
  );
};

export default UserMenu;
