import { useHistory } from "react-router-dom";
import styles from "./button.module.scss";

const Button = ({
  children,
  buttonClass = "",
  type,
  link = "/",
  onClick,
  reload = true,
}) => {
  const history = useHistory();
  const style = buttonClass
    .trim()
    .split(" ")
    .map((c) => styles[c])
    .join(" ");

  return (
    <>
      {type === "link" ? (
        <p
          onClick={() => {
            history.push(link);
          }}
          className={style}
        >
          {children}
        </p>
      ) : (
        <button className={style} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
