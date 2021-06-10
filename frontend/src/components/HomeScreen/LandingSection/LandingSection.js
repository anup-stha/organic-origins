import styles from "./landing-section.module.scss";
import Button from "../../ui/Button";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  return (
    <>
      <span className={styles.anchor} id="top"></span>
      <header className={styles.header}>
        <div className={styles.header_logoBox}>
          <img
            src="images/logo-white.png"
            alt="LOGO"
            className={styles.header_logo}
          />
        </div>
        <div className={styles.header_textBox}>
          <h1 className={styles.headingPrimary}>
            <span className={styles.headingPrimary__main}>Organic Origins</span>
            <span className={styles.headingPrimary__sub}>
              NATURAl & Organic Products from Nepal
            </span>
          </h1>

          <Button
            buttonClass={"btn btn__white btn__animated"}
            onClick={() => {
              history.push("/products");
            }}
          >
            Discover Our Products
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;
