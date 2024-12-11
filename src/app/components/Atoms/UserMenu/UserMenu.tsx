import styles from "./UserMenu.module.scss";
import user from "../.././../../assets/UserIcon.svg";
const UserMenu = () => {
  return (
    <div className={styles.user}>
      <img src={user} alt="User" />
      <p>Minha Conta</p>
    </div>
  );
};

export default UserMenu;
