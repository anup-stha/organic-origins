import { useState } from "react";
import styles from "./order-list.module.scss";
import { listUserOrder } from "app/slice/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import Loader from "components/ui/Loader";
import Message from "components/Message/Message";

const OrderList = () => {
  const dispatch = useDispatch();
  useState(() => {
    dispatch(listUserOrder());
  }, []);

  const orderList = useSelector((state) => state.orders.orderListUser);

  const { info, loading, error } = orderList;
  return (
    <div>
      <h1 className={styles.heading_2}>Orders</h1>
      {loading && <Loader />}
      {error && <Message info="error">{error}</Message>}
      <table className={styles.myorder_table}>
        <thead className={styles.myorder_thead}>
          <tr className={[styles.myorder_tr, styles.user_tr].join(" ")}>
            <td>#</td>
            <td>Date</td>
            <td>Total</td>
            <td>Paid</td>
            <td>Deliver</td>
            <td>Details</td>
          </tr>
        </thead>

        {info.map((item) => (
          <tbody key={item._id} className={styles.myorder_tbody}>
            <tr className={styles.myorder_tr}>
              <td className={styles.myorder_td}>{item._id}</td>
              <td className={styles.myorder_td}>
                {item.createdAt.substring(0, 10)}
              </td>
              <td className={styles.myorder_td}>
                Rs. {item.totalPrice.toFixed(2)}
              </td>
              <td className={styles.myorder_td}>
                {item.isPaid ? (
                  <div className={styles.table_paid}>
                    <i class="ph-check-light"></i>
                  </div>
                ) : (
                  <div className={styles.table_unpaid}>
                    <i class="ph-x-light"></i>
                  </div>
                )}
              </td>
              <td className={styles.myorder_td}>
                {item.isDelivered
                  ? item.deliveredAt.substring(0, 10)
                  : "Delivering!!"}
              </td>
              <td className={styles.myorder_td}>
                <Link to={`/order/${item._id}`}>
                  <IconButton>
                    <i class="ph-caret-double-right-light"></i>
                  </IconButton>
                </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default OrderList;
