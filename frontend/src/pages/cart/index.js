import { useDispatch, useSelector } from "react-redux";

import Footer from "../../components/HomeScreen/FooterSection/FooterSection";
import Header from "../../components/layout/Header";
import styles from "./cart.module.scss";

import Quantity from "../../components/Quantity";
import { removeFromCart } from "../../app/slice/cartSlice";

import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import Button from "../../components/ui/Button";
import Alert from "components/Alert/Alert";
import { useHistory } from "react-router-dom";

const CartScreen = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const history = useHistory();
  const products = items.map((item) => (
    <CartItem key={item.name} item={item} />
  ));

  return (
    <>
      <Header />
      <div className={styles.container}>
        {items.length !== 0 && (
          <Button
            buttonClass="goBack"
            onClick={() => {
              history.goBack();
            }}
          >
            GO BACK
          </Button>
        )}
        <div className={styles.mainContent}>
          <h1 className={styles.heading_1}>Shopping Cart</h1>
          {items.length === 0 ? (
            <Alert
              text="Your Cart Is Empty"
              info="error"
              button1="Go Back "
              button1_link="/products"
            />
          ) : (
            <div className={styles.cart_row_container}>
              <div className={styles.cart_container}>{products}</div>
              <div className={styles.total_container}>
                <h1 className={styles.headingOtherSecondary_3}>Order Info</h1>
                <div className={styles.grid_row_spaceBetween_2}>
                  <p className={styles.paragraph_1}>SubTotal</p>
                  <p className={styles.price_tiny}>
                    Rs.{" "}
                    {items
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className={styles.grid_row_spaceBetween_2}>
                  <p className={styles.paragraph_1}>Delivery</p>
                  <p className={styles.price_tiny}>Rs. 0</p>
                </div>
                <div className={styles.line}></div>
                <div className={styles.u_center_text}>
                  <Button
                    buttonClass="btn btn__green"
                    type="link"
                    link="/login?redirect=shipping"
                  >
                    PROCEED TO CHECKOUT
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty);
  const [removeItem, setRemoveItem] = useState(false);

  const dispatch = useDispatch();

  const removeCartHandler = (id) => {
    setRemoveItem(true);
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={
        removeItem
          ? styles.cart_item_container
          : [
              styles.cart_item_container,
              styles.cart_item_container_remove,
            ].join(" ")
      }
      key={item.product}
    >
      <div className={styles.grid_row_cart}>
        <img
          src={item.image}
          alt="product"
          className={styles.cart_item_container_image}
        />

        <div className={[styles.grid_col_width_full].join(" ")}>
          <div
            className={[
              styles.grid_row_spaceBetween,
              styles.margin_negative,
            ].join(" ")}
          >
            <div className={styles.grid_col}>
              <div className={styles.grid_row_baseline}>
                <h1 className={styles.headingOtherSecondary}>{item.name}</h1>
              </div>

              <div className={styles.margin_negative}>
                <p className={styles.paragraphOther}>
                  <span>Brand</span>: Organic Origins | <span>Category</span>:
                  Cosmetics
                </p>
              </div>
            </div>
            <p className={styles.price_small}>Rs. {item.price * qty}</p>
          </div>
          <div className={styles.grid_row_spaceBetween_flexEnd}>
            <div>
              <Quantity
                initialValue={Number(item.qty)}
                setQuantity={setQty}
                dispatch={true}
                id={item.product}
              />
            </div>
            <div
              className={styles.paragraphOther_danger}
              onClick={() => removeCartHandler(item.product)}
            >
              <BsTrash size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
