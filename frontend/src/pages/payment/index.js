import Header from "../../components/layout/Header";
import Footer from "../../components/HomeScreen/FooterSection/FooterSection";
import styles from "./payment.module.scss";
import CheckOutSteps from "../../components/navigation/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { savePaymentMethod } from "../../app/slice/cartSlice";
import Button from "../../components/ui/Button";
import { useHistory } from "react-router-dom";
import IconCustom from "./icon";

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod } = cart;
  const history = useHistory();
  const user = useSelector((state) => state.users.user.currentUser.info);

  const paymentOptions = ["Cash On Delivery", "Paypal"];
  const [selectedOption, setSelectedOption] = useState(paymentMethod);

  useEffect(() => {
    if (!shippingAddress) {
      history.push("/shipping");
    }
    if (!user) {
      history.push("/login?redirect=shipping");
    }
  }, [history, user, shippingAddress]);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(selectedOption));
    history.push("/placeOrder");
  };

  const optionHandler = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <CheckOutSteps step1 step2 active="step3" />
        <div className={styles.payment_container}>
          <div className={styles.u_margin_bottom_medium}>
            <h1 className={styles.heading_1}>Choose a Payment Method</h1>
          </div>
          <form onSubmit={submitHandler}>
            <div className={styles.paymentOption_container}>
              {paymentOptions.map((option) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    optionHandler(option);
                  }}
                  className={
                    option === selectedOption
                      ? [
                          styles.paymentOption,
                          styles.paymentOption_selected,
                        ].join(" ")
                      : [
                          styles.paymentOption,
                          styles.paymentOption_notselected,
                        ].join(" ")
                  }
                >
                  <IconCustom
                    name={option}
                    iconClassName={styles.main_icon}
                  ></IconCustom>
                  <p>{option}</p>
                  <div
                    className={
                      option === selectedOption
                        ? styles.paymentOption_selected_icon
                        : styles.paymentOption_notselected_icon
                    }
                  >
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
              ))}
            </div>
            <div className={styles.button}>
              <Button buttonClass="btn btn__green">NEXT STEP</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentScreen;
