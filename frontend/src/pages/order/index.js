import Header from "../../components/layout/Header";
import Footer from "../../components/HomeScreen/FooterSection/FooterSection";
import styles from "./order.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getOrderDetails,
  payOrder,
  resetPay,
  resetDeliver,
  deliverOrder,
} from "../../app/slice/orderSlice";
import { useHistory } from "react-router-dom";
import IconCustom from "../payment/icon";

import axios from "axios";

import { Link } from "react-router-dom";
import Loader from "components/ui/Loader";
import { PayPalButton } from "react-paypal-button-v2";
import Button from "components/ui/Button";
import Message from "components/Message/Message";
import moment from "moment";

const OrderScreen = ({ match }) => {
  const history = useHistory();
  const [sdkReady, setSdkReady] = useState(false);

  const orderCreateInfo = useSelector((state) => state.orders.orderCreate.info);

  const orderDetails = useSelector((state) => state.orders.orderDetails);
  const { loading, error, info } = orderDetails;

  const id = match.params.id;
  const dispatch = useDispatch();

  const orderPay = useSelector((state) => state.orders.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orders.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const user = useSelector((state) => state.users.user.currentUser.info);

  const subtotal = info.orderItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");

      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      Object.keys(info.orderItems).length === 0 ||
      successPay ||
      successDeliver ||
      id !== info._id
    ) {
      dispatch(resetPay());
      dispatch(resetDeliver());
      dispatch(getOrderDetails(id));
    } else if (!info.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, id, successPay, info, successDeliver]);

  const successHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(paymentResult, id));
  };

  const deliverHandler = (id) => {
    dispatch(deliverOrder(id));
  };
  return (
    <>
      <Header />

      <div className={styles.container}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message info="error">{error}</Message>
        ) : (
          <>
            <Button
              buttonClass="goBack"
              onClick={() => {
                if (orderCreateInfo) {
                  history.push("/products");
                } else {
                  history.goBack();
                }
              }}
            >
              GO BACK
            </Button>

            <div className={styles.payment}>
              <div className={styles.payment_container}>
                <div className={styles.grid_col}>
                  <div className={styles.u_margin_bottom_small}>
                    <h1 className={styles.heading_2}>Order {id}</h1>
                  </div>
                  <div className={styles.payment_description}>
                    <div className={styles.grid_col_space_3}>
                      <div>
                        <h1 className={styles.paragraphOther_3}>
                          Delivery Address
                        </h1>
                        {!info.isDelivered ? (
                          <Message info="error"> Not Delivered !! </Message>
                        ) : (
                          <Message info="success">
                            {" "}
                            Delivered on{" "}
                            {moment(info.deliveredAt).format(
                              "YYYY/MM/D hh:mm:ss"
                            )}
                          </Message>
                        )}
                        <div className={styles.delivery_box}>
                          <div className={styles.delivery_box_name}>
                            {info.user && info.user.name}
                          </div>
                          <div className={styles.paragraphOther}>
                            {info.shippingAddress.address},{" "}
                            {info.shippingAddress.city}
                          </div>
                          <div className={styles.paragraphOther}>
                            {info.shippingAddress.postalCode}-
                            {info.shippingAddress.zone}
                          </div>
                          <div className={styles.paragraphOther}>
                            {info.shippingAddress.province}{" "}
                            {info.shippingAddress.country}
                          </div>
                          <div className={styles.paragraphOther}>
                            Mobile No:- {info.shippingAddress.phone}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h1 className={styles.paragraphOther_3}>
                          Payment Details
                        </h1>
                        {!info.isPaid ? (
                          <Message info="error"> Amount Not Paid !!</Message>
                        ) : (
                          <Message info="success">
                            Paid on{" "}
                            {moment(info.paidAt).format("YYYY/MM/D hh:mm:ss")}
                          </Message>
                        )}
                        <div className={styles.payment_box}>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            className={[
                              styles.paymentOption,
                              styles.paymentOption_selected,
                            ].join(" ")}
                          >
                            <IconCustom
                              name={info.paymentMethod}
                              iconClassName={styles.main_icon}
                            ></IconCustom>
                            <p>{info.paymentMethod}</p>
                            <div className={styles.paymentOption_selected_icon}>
                              <svg
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="352.62px"
                                height="352.62px"
                                viewBox="0 0 352.62 352.62"
                                className={styles.tick}
                              >
                                <g>
                                  <path
                                    d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
		                    c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
	                    	c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
		                    c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
		                    C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
		                              c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"
                                  />
                                </g>
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h1 className={styles.paragraphOther_3}>
                          Order Summary
                        </h1>

                        {info.orderItems.map((item) => (
                          <div key={item.product} className={styles.cart_div}>
                            <img
                              src={item.image}
                              className={styles.cart_image}
                              alt={item.name}
                            />
                            <h1 className={styles.paragraphOther_4}>
                              <Link to={`products/${item.product}`}>
                                {item.name}
                              </Link>
                            </h1>
                            <div className={styles.paragraphOther_5}>
                              {item.qty} x{" "}
                              <span className={styles.paragraphOther_4}>
                                Rs. {item.price} = Rs. {item.price * item.qty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.payment_summary}
                  style={{
                    height:
                      info.isPaid ||
                      info.paymentMethod !== "Paypal" ||
                      user.isAdmin
                        ? "30rem"
                        : "47rem",
                  }}
                >
                  <div className={styles.headingOtherSecondary_4}>
                    Order Details
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.grid_row_spaceBetween}>
                    <h1 className={styles.paragraphOther_4}>Price</h1>
                    <div className={styles.paragraphOther_5}>
                      Rs. {subtotal}
                    </div>
                  </div>
                  <div className={styles.grid_row_spaceBetween}>
                    <h1 className={styles.paragraphOther_4}>Delivery Charge</h1>
                    <div className={styles.paragraphOther_5}>
                      Rs. {info.shippingPrice}
                    </div>
                  </div>
                  <div className={styles.grid_row_spaceBetween}>
                    <h1 className={styles.paragraphOther_4}>Tax</h1>
                    <div className={styles.paragraphOther_5}>
                      {" "}
                      Rs. {info.taxPrice}
                    </div>
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.grid_row_spaceBetween}>
                    <h1 className={styles.headingOtherSecondary_4}>Total</h1>
                    <div className={styles.paragraphOther_5}>
                      Rs. {info.totalPrice && info.totalPrice.toFixed(2)}
                    </div>
                  </div>
                  {!info.isPaid && (
                    <>
                      {loadingPay && <Loader />}
                      {!sdkReady ? (
                        <Loader />
                      ) : (
                        !user.isAdmin &&
                        info.paymentMethod === "Paypal" && (
                          <PayPalButton
                            amount={info.totalPrice}
                            onSuccess={successHandler}
                          />
                        )
                      )}
                    </>
                  )}
                  {loadingDeliver && <Loader />}
                  {user.isAdmin && info.isPaid && !info.isDelivered && (
                    <div
                      className={[
                        styles.u_margin_top_medium,
                        styles.u_center_text,
                      ].join(" ")}
                    >
                      <Button
                        buttonClass="btn btn__green"
                        onClick={() => deliverHandler(id)}
                      >
                        Marked As Delivered
                      </Button>
                    </div>
                  )}
                  {user.isAdmin &&
                    info.paymentMethod !== "Paypal" &&
                    !info.isPaid && (
                      <div
                        className={[
                          styles.u_margin_top_medium,
                          styles.u_center_text,
                        ].join(" ")}
                      >
                        <Button
                          onClick={() =>
                            successHandler({
                              id: id,
                              status: "CASH ON DELIVERY",
                              update_time: Date.now(),
                              payer: { email_address: user.email },
                            })
                          }
                          buttonClass="btn btn__green"
                        >
                          Marked As Paid
                        </Button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderScreen;
