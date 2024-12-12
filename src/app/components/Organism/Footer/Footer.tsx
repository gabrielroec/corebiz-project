import styles from "./Footer.module.scss";
import contact from "../../../../assets/contact.svg";
import email from "../../../../assets/email.svg";
import footerLogo from "../../../../assets/footerLogo.svg";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSide}>
          <a href="/">
            <img src={email} alt="" />
            <p>ENTRE EM CONTATO</p>
          </a>
          <a href="/">
            <img src={contact} alt="" />
            <p>
              FALE COM O NOSSO
              <br /> CONSULTOR ONLINE
            </p>
          </a>
        </div>

        <div className={styles.bottomSide}>
          <p className={styles.title}>Localização</p>
          <div className={styles.line} />
          <p className={styles.text}>
            Avenida Andrômeda, 2000. Bloco 6 e 8 - Alphavile SP
            <br /> brasil@corebiz.ag
            <br /> +55 11 3090 1039
          </p>
        </div>

        <div className={styles.footerLogo}>
          <p>Created by</p>
          <img src={footerLogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
