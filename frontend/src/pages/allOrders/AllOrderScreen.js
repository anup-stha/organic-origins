import { listAllOrder } from "app/slice/orderSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./all-order-screen.module.scss";
import { Link } from "react-router-dom";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import Message from "components/Message/Message";
import Loader from "components/ui/Loader";

const AllOrderScreen = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.allOrders);
  const { info, loading, error } = orders;
  useEffect(() => {
    dispatch(listAllOrder());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message info="error">{error}</Message>
      ) : (
        <table className={styles.order_table}>
          <thead className={styles.order_thead}>
            <tr className={[styles.table_heading, styles.order_tr].join(" ")}>
              <td>ID</td>
              <td>User</td>
              <td>Date</td>
              <td>Total </td>
              <td>Paid</td>
              <td>Paid Date</td>
              <td>Delivered</td>
              <td> Delivered Date</td>
              <td>Payment</td>

              <th></th>
            </tr>
          </thead>
          {info.map((item) => (
            <Order order={item} key={item._id} />
          ))}
        </table>
      )}
    </div>
  );
};

const Order = ({ order }) => {
  return (
    <tbody key={order._id} className={styles.order_tbody}>
      <tr className={styles.order_tr}>
        <td className={styles.order_td}>{order._id}</td>
        <td className={styles.order_td}>{order.user && order.user.name}</td>
        <td className={styles.order_td}>{order.createdAt.substring(0, 10)}</td>
        <td className={styles.order_td}>Rs .{order.totalPrice}</td>
        <td className={styles.order_td}>
          {order.isPaid ? (
            <div className={styles.table_paid}>
              <i class="ph-check-light"></i>{" "}
            </div>
          ) : (
            <div className={styles.table_unpaid}>
              <i class="ph-x-light"></i>
            </div>
          )}
        </td>
        <td className={styles.order_td}>
          {order.isPaid ? moment(order.paidAt).format("MMMM Do, YYYY") : "-"}
        </td>
        <td className={styles.order_td}>
          {order.isDelivered ? (
            <div className={styles.table_paid}>
              <i class="ph-check-light"></i>{" "}
            </div>
          ) : (
            <div className={styles.table_unpaid}>
              <i class="ph-x-light"></i>
            </div>
          )}
        </td>
        <td className={styles.order_td}>
          {order.isDelivered
            ? moment(order.deliveredAt).format("MMMM Do, YYYY")
            : "-"}
        </td>
        <td className={styles.order_td}>
          {order.paymentMethod === "Cash On Delivery"
            ? "COD"
            : order.paymentMethod}
        </td>
        <td className={styles.order_td}>
          <Link to={`/order/${order._id}`}>
            <IconButton>
              <i class="ph-caret-double-right-light"></i>
            </IconButton>
          </Link>
        </td>
      </tr>
    </tbody>
  );
};
export default AllOrderScreen;
