import Footer from "components/HomeScreen/FooterSection/FooterSection";
import Header from "../../components/layout/Header";
import Rating from "../../components/Rating";
import Button from "../../components/ui/Button";
import Quantity from "../../components/Quantity";

import styles from "./product.module.scss";
import { useHistory, useParams } from "react-router-dom";

import { loadProductDetails } from "../../app/slice/productDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { TiTick } from "react-icons/ti";
import Loader from "../../components/ui/Loader";

import { addToCart } from "../../app/slice/cartSlice";

import Alert from "../../components/Alert/Alert";
import {
  createProductReview,
  productReviewReset,
} from "app/slice/productReviewSlice";
import Message from "components/Message/Message";
import { Link } from "react-router-dom";
import moment from "moment";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(" ");

  const { success: successReview, error: errorReview } = useSelector(
    (state) => state.products.productReview
  );

  const userInfo = useSelector((state) => state.users.user.currentUser.info);

  let { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (successReview) {
      alert("Review Submitted");
      setRating(0);
      setComment(" ");
      dispatch(productReviewReset());
    }
    dispatch(loadProductDetails(id));
  }, [id, dispatch, successReview]);

  const { product, loading, error } = useSelector(
    (state) => state.products.productDetails
  );

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, qty));
    setShowAlert(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
  };
  return (
    <>
      <Header />

      <div className={styles.container}>
        <Alert
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          text={`${qty} Items Added !!`}
          className={"styles.alert_container"}
          button1="Check Cart"
          button1_link="/cart"
          button2="Continue Shopping"
          button2_link="/products"
        />
        {/* <div className={styles.goBack}>
          <AiOutlineDoubleLeft size={40} />
          <p>Go Back</p>
        </div> */}
        <Button
          buttonClass="goBack"
          onClick={() => {
            history.goBack();
          }}
        >
          GO BACK
        </Button>
        {loading ? (
          <Loader />
        ) : error ? (
          <Alert text={`${error} . Please refresh the page`} info="error" />
        ) : (
          <div className={styles.productDetails}>
            <div className={styles.mainContent}>
              <div className={styles.mainContent_col_1_of_2}>
                <img src={product.image} alt={product.name}></img>
              </div>
              <div className={styles.mainContent_col_2_of_2}>
                <div className={styles.content}>
                  <h1 className={styles.headingOtherPrimary}>{product.name}</h1>
                  <div className={styles.content_stock}>
                    {product.countInStock > 0 ? (
                      <div className={styles.content_InStock}>
                        <div className={styles.stock}>
                          <TiTick size={15} />
                          <span>In Stock</span>
                        </div>
                        ({product.countInStock} items left)
                      </div>
                    ) : (
                      <div className={styles.content_OutStock}>
                        {" "}
                        Not in Stock{" "}
                      </div>
                    )}

                    <Rating
                      value={product.rating}
                      size={15}
                      text={`(${product.numReviews} reviews)`}
                    />
                  </div>

                  <div className={styles.u_margin_top_small}>
                    <p className={styles.paragraphOther}>
                      {product.description}
                    </p>
                  </div>

                  <div className={styles.line}></div>

                  <p className={styles.price} style={{ marginTop: "-2rem" }}>
                    Rs. {qty * product.price}
                  </p>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span className={styles.quantity_label}> Quantity :</span>
                    <Quantity
                      setQuantity={setQty}
                      maxValue={product.countInStock}
                    />
                  </div>
                  <div className={styles.product_button_container}>
                    <Button
                      buttonClass="button_product button_product_default"
                      onClick={() => {
                        history.push("/cart");
                        dispatch(addToCart(product._id, qty));
                      }}
                    >
                      Buy Now
                    </Button>

                    <Button
                      buttonClass="button_product button_product_outline"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.review}>
              <div className={styles.u_margin_top_medium}>
                <div className={styles.line2}></div>
              </div>
              <div className={styles.u_margin_top_small}>
                <h2 className={styles.heading_3}>Reviews</h2>
                {product.reviews.length === 0 && (
                  <Message info="warning">No Review Found</Message>
                )}
                {product.reviews.map((review) => (
                  <div key={review._id}>
                    <div className={styles.line3}></div>

                    <div className={styles.grid_row_alignItems}>
                      <div>
                        <Rating value={review.rating} size={15} />
                        <p className={styles.paragraphOther_3}>{review.name}</p>

                        <p className={styles.paragraphOther_4}>
                          {moment(review.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss"
                          )}
                        </p>
                      </div>
                      <p className={styles.comment}>{review.comment}</p>
                    </div>
                    <div className={styles.line3}></div>
                  </div>
                ))}

                <h2
                  className={styles.paragraphOther_3}
                  style={{ marginTop: "3rem" }}
                >
                  Write a Review
                </h2>
                {userInfo ? (
                  <>
                    {errorReview && (
                      <Message info="error">{errorReview}</Message>
                    )}
                    <form onSubmit={submitHandler} c>
                      <div className={styles.select_wrapper}>
                        <select
                          className={styles.select}
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1-Poor</option>
                          <option value="2">2-Fair</option>
                          <option value="3">3-Good</option>
                          <option value="4">4-Very Good</option>
                          <option value="5">5-Excellent</option>
                        </select>
                      </div>
                      <div className={styles.form_group}>
                        <textarea
                          type="text"
                          className={[
                            styles.form_input,
                            styles.form_textarea,
                          ].join(" ")}
                          placeholder="Your Message"
                          id="message"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                        <label htmlFor="message" className={styles.form_label}>
                          Your Message
                        </label>
                      </div>

                      <Button buttonClass="btn btn__green"> Submit</Button>
                    </form>
                  </>
                ) : (
                  <Message info="warning">
                    Please{" "}
                    <div style={{ textDecoration: "underline" }}>
                      <Link to="/login">Login In</Link>{" "}
                    </div>
                    to write a review
                  </Message>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
