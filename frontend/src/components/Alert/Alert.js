import styles from "./alert.module.scss";
import { FaCheckCircle } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import Button from "../ui/Button";

const Alert = ({
  text,
  setShowAlert = () => {},
  showAlert = true,
  info = "success",
  button1,
  button2,
  button1_link,
  button2_link,
}) => {
  const closeHandler = () => {
    setShowAlert(false);
  };

  return (
    <div className={showAlert ? styles.alert_container : styles.alert_hide}>
      <div
        className={
          info === "success"
            ? styles.alert_container_indicator
            : styles.alert_container_indicator_error
        }
      ></div>
      <div
        className={
          info === "success"
            ? styles.alert_container_icon
            : styles.alert_container_icon_error
        }
      >
        {info === "success" ? (
          <FaCheckCircle size={25} />
        ) : (
          <RiErrorWarningFill size={30} />
        )}
      </div>
      <div className={styles.alert_container_text}>
        <div className={styles.grid_col_space_half}>
          <span className={styles.paragraph_bold}>{text}</span>
          <div className={styles.grid_row_space_3}>
            {button1 && (
              <Button buttonClass="btn_text_2" type="link" link={button1_link}>
                {button1}
              </Button>
            )}
            {button2 && (
              <Button buttonClass="btn_text_2" type="link" link={button2_link}>
                {button2}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div
        className={styles.alert_container_icon_remove}
        onClick={closeHandler}
      >
        <AiOutlineClose size={25} />
      </div>{" "}
    </div>
  );
};

export default Alert;
