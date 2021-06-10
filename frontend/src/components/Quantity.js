import { useState } from "react";
import styles from "./Quantity.module.scss";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { editCart } from "../app/slice/cartSlice";

const Quantity = ({
  maxValue = 10,
  setQuantity,
  initialValue = 1,
  dispatch = false,
  id = "#",
}) => {
  const [value, setValue] = useState(initialValue);
  const dispatchRedux = useDispatch();
  const valueHandler = (type) => {
    if (type === "-") {
      let tempValue = value < 1 ? Number(value) : Number(value) - 1;
      setValue(tempValue);

      setQuantity(tempValue);
      if (dispatch === true) {
        dispatchRedux(editCart(id, tempValue));
      }
    } else if (type === "+") {
      let tempValue = value >= maxValue ? Number(value) : Number(value) + 1;
      setValue(tempValue);

      setQuantity(tempValue);

      if (dispatch === true) {
        dispatchRedux(editCart(id, tempValue));
      }
    }
  };

  return (
    <div className={styles.quantity_container}>
      <button
        onClick={() => {
          valueHandler("-");
        }}
        className={styles.quantity_button_minus}
      >
        <AiOutlineMinus size={12} />
      </button>
      <input
        type="number"
        name="quantity"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value >= 10) {
            setValue(10);
          }
          setQuantity(e.target.value <= 10 ? e.target.value : 10);
        }}
        min={0}
        max={maxValue}
        className={styles.quantity_input}
      />
      <button
        onClick={() => valueHandler("+")}
        className={styles.quantity_button_plus}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default Quantity;
