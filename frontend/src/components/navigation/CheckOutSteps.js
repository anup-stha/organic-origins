import styles from "./checkoutsteps.module.scss";
import { AiFillCheckCircle } from "react-icons/ai";

import { Link } from "react-router-dom";
const CheckOutSteps = ({ step1, step2, step3, step4, active }) => {
  return (
    <div className={styles.steps_container}>
      <ul className={styles.steps_list}>
        {step1 ? (
          <li className={styles.steps_list_item_completed}>
            <AiFillCheckCircle size={30} />

            <div>
              <Link to="/login">Login</Link>
            </div>
          </li>
        ) : null}

        {step2 ? (
          <li className={styles.steps_list_item_completed}>
            <AiFillCheckCircle size={30} />

            <div>
              <Link to="/shipping"> Shipping </Link>
            </div>
          </li>
        ) : (
          <li
            className={
              active === "step2"
                ? styles.steps_list_item_active
                : styles.steps_list_item_inactive
            }
          >
            <div
              className={
                active === "step2"
                  ? styles.steps_list_item_active_number
                  : styles.steps_list_item_inactive_number
              }
            >
              2
            </div>
            Shipping
          </li>
        )}

        {step3 ? (
          <li className={styles.steps_list_item_completed}>
            <AiFillCheckCircle size={30} />
            <Link to="/payment"> Payment </Link>{" "}
          </li>
        ) : (
          <li
            className={
              active === "step3"
                ? styles.steps_list_item_active
                : styles.steps_list_item_inactive
            }
          >
            <div
              className={
                active === "step3"
                  ? styles.steps_list_item_active_number
                  : styles.steps_list_item_inactive_number
              }
            >
              3
            </div>

            <Link to="/payment"> Payment </Link>
          </li>
        )}

        {step4 ? (
          <li className={styles.steps_list_item_completed}>
            <AiFillCheckCircle size={30} />
            <Link to="/placeOrder"> Place Order </Link>{" "}
          </li>
        ) : (
          <li
            className={
              active === "step4"
                ? styles.steps_list_item_active
                : styles.steps_list_item_inactive
            }
          >
            <div
              className={
                active === "step4"
                  ? styles.steps_list_item_active_number
                  : styles.steps_list_item_inactive_number
              }
            >
              4
            </div>

            {step4 ? (
              <Link to="/placeOrder"> Place Order </Link>
            ) : (
              <Link to="/placeOrder">Place Order</Link>
            )}
          </li>
        )}
      </ul>
    </div>
  );
};

export default CheckOutSteps;
