import Header from "../../components/layout/Header";
import Footer from "../../components/HomeScreen/FooterSection/FooterSection";
import styles from "./shipping.module.scss";
import CheckOutSteps from "../../components/navigation/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { saveShippingAddress } from "../../app/slice/cartSlice";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { useHistory } from "react-router-dom";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.users.user.currentUser.info);
  const history = useHistory();
  let { shippingAddress } = cart;
  shippingAddress = shippingAddress ? shippingAddress : {};
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [zone, setZone] = useState(shippingAddress.zone);
  const [province, setProvince] = useState(shippingAddress.province);
  const [phone, setPhone] = useState(shippingAddress.phone);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push("/login?redirect=shipping");
    }
  }, [user, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        zone,
        province,
        phone,
        postalCode,
        country,
      })
    );

    history.push("/payment");
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <CheckOutSteps step1 active="step2" />
        <Button
          buttonClass="goBack"
          onClick={() => {
            history.push("/cart");
          }}
        >
          GO BACK
        </Button>

        <div className={styles.shipping_container}>
          <form className={styles.form_group} onSubmit={submitHandler}>
            <div className={styles.u_margin_bottom_medium}>
              <h1 className={styles.heading_1}>Shipping Details</h1>
            </div>
            <div className={styles.grid_container}>
              <div className={styles.Address}>
                {" "}
                <Input
                  type="address"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                >
                  Enter Address
                </Input>
              </div>
              <div className={styles.city}>
                <Input
                  type="name"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  Enter City
                </Input>
              </div>
              <div className={styles.zone}>
                <Input
                  type="name"
                  id="zone"
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                >
                  Enter Zone
                </Input>
              </div>
              <div className={styles.province}>
                <Input
                  type="name"
                  id="province"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  Enter Province
                </Input>
              </div>
              <div className={styles.Phone}>
                <Input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  pattern="[0-9]*"
                >
                  Enter Phone
                </Input>
              </div>
              <div className={styles.postal}>
                <Input
                  type="text"
                  id="postalCode"
                  value={postalCode}
                  pattern="[0-9]*"
                  onChange={(e) => setPostalCode(e.target.value)}
                >
                  Enter Postal Code
                </Input>
              </div>
              <div className={styles.Country}>
                <Input
                  type="name"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  Enter Country
                </Input>
              </div>
            </div>
            <div className={styles.width_auto}>
              <Button buttonClass="btn btn__green">NEXT STEP</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingScreen;
