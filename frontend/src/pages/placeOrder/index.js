import Header from "../../components/layout/Header";
import Footer from "../../components/HomeScreen/FooterSection/FooterSection";
import styles from "./placeorder.module.scss";
import CheckOutSteps from "../../components/navigation/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Button from "../../components/ui/Button";
import { createOrder } from "../../app/slice/orderSlice";
import { useHistory } from "react-router-dom";
import IconCustom from "../payment/icon";

import { Link } from "react-router-dom";
import Loader from "components/ui/Loader";
import { clearCart } from "app/slice/cartSlice";
const PlaceOrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  let { cartItems, shippingAddress, paymentMethod } = cart;
  const userName = useSelector((state) => state.users.user.currentUser.info);

  const subtotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const deliveryCharge = (cart.itemsPrice > 100 ? 0 : 100).toFixed(2);
  const tax = (0).toFixed(2);
  const total =
    Number(
      cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
    ) +
    Number(tax) +
    Number(deliveryCharge);

  const orderCreate = useSelector((state) => state.orders.orderCreate);

  // eslint-disable-next-line
  const { loading, success, error, info } = orderCreate;

  useEffect(() => {
    if (!shippingAddress.address) {
      history.push("/shipping");
    }

    if (cartItems.length === 0) {
      history.push("/cart");
    }
    if (success) {
      history.push(`/order/${info._id}`);
    }
    // eslint-disable-next-line
  }, [success, history]);

  const placeOrderHandler = () => {
    dispatch(clearCart());

    dispatch(
      createOrder({
        orderItems: cartItems,
        paymentMethod: paymentMethod,

        shippingAddress: shippingAddress,
        itemsPrice: subtotal,
        shippingPrice: deliveryCharge,
        taxPrice: tax,
        totalPrice: total,
      })
    );
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <CheckOutSteps step1 step2 step3 active="step4" />
            <div className={styles.u_margin_bottom_medium}>
              <h1 className={styles.headingOtherSecondary_3_bold}>
                You are almost there!
              </h1>
            </div>
            <div className={styles.payment_container}>
              <div className={styles.payment_description}>
                <div className={styles.grid_col_space_3}>
                  <div>
                    <h1 className={styles.paragraphOther_3}>
                      Delivery Address
                    </h1>

                    <div className={styles.delivery_box}>
                      <div className={styles.delivery_box_name}>
                        {userName.name}
                      </div>
                      <div className={styles.paragraphOther}>
                        {shippingAddress.address}, {shippingAddress.city}
                      </div>
                      <div className={styles.paragraphOther}>
                        {shippingAddress.postalCode}-{shippingAddress.zone}
                      </div>
                      <div className={styles.paragraphOther}>
                        {shippingAddress.province} {shippingAddress.country}
                      </div>
                      <div className={styles.paragraphOther}>
                        Mobile No:- {shippingAddress.phone}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className={styles.paragraphOther_3}>Payment Details</h1>
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
                          name={paymentMethod}
                          iconClassName={styles.main_icon}
                        ></IconCustom>
                        <p>{paymentMethod}</p>
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
                    <h1 className={styles.paragraphOther_3}>Order Summary</h1>

                    {cartItems.map((item, index) => (
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
              <div className={styles.payment_summary}>
                <div className={styles.headingOtherSecondary_4}>
                  Order Details
                </div>
                <div className={styles.line}></div>
                <div className={styles.grid_row_spaceBetween}>
                  <h1 className={styles.paragraphOther_4}>Price</h1>
                  <div className={styles.paragraphOther_5}>Rs. {subtotal}</div>
                </div>
                <div className={styles.grid_row_spaceBetween}>
                  <h1 className={styles.paragraphOther_4}>Delivery Charge</h1>
                  <div className={styles.paragraphOther_5}>
                    Rs. {deliveryCharge}
                  </div>
                </div>
                <div className={styles.grid_row_spaceBetween}>
                  <h1 className={styles.paragraphOther_4}>Tax</h1>
                  <div className={styles.paragraphOther_5}> Rs. {tax}</div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.grid_row_spaceBetween}>
                  <h1 className={styles.paragraphOther_4}>Total</h1>
                  <div className={styles.paragraphOther_5}>
                    Rs. {total.toFixed(2)}
                  </div>
                </div>
                <div className={styles.u_center_text}>
                  <Button
                    buttonClass="btn btn__green"
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
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

export default PlaceOrderScreen;
