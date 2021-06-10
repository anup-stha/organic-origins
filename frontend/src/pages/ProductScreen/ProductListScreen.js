import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProductList } from "../../app/slice/productListSlice";

import Header from "../../components/layout/Header";
import Footer from "../../components/HomeScreen/FooterSection/FooterSection";

import Card from "../../components/HomeScreen/Card";
import styles from "./product.module.scss";

import { Fragment } from "react";

import Loader from "../../components/ui/Loader";
import { useHistory } from "react-router";
import Paginate from "components/Paginate";
import Button from "components/ui/Button";
import Message from "components/Message/Message";

const ProductListScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products.productList);

  const { products, loading, error } = productList;
  const { list, page, pages } = products;
  const history = useHistory();
  useEffect(() => {
    dispatch(loadProductList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productElements = list.map((product) => {
    const handleRoute = () => {
      const fullLink = `/product/${product._id}`;
      history.push(fullLink);
    };

    return (
      <Fragment key={product._id}>
        <div className={styles.col_1_of_3}>
          <Card
            heading={product.name}
            color="orange"
            price={product.price}
            image={product.image}
            onClick={handleRoute}
            category={product.category}
            brand={product.brand}
            rating={product.rating}
          />
        </div>
      </Fragment>
    );
  });

  return (
    <>
      <Header />

      <div className={styles.container}>
        {match.params.keyword ? (
          <Button
            buttonClass="goBack"
            onClick={() => {
              history.goBack();
            }}
          >
            {" "}
            GO BACK
          </Button>
        ) : null}
        <div
          className={[styles.u_center_text, styles.u_margin_bottom_medium].join(
            " "
          )}
        >
          <h1 className={styles.headingSecondary}>
            {match.params.keyword ? `Results for ${keyword}` : "TOP PRODUCTS"}
          </h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className={styles.row}>
              {error && <Message info="error">{error}</Message>}
              {productElements}
            </div>
          </>
        )}
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </div>

      <Footer />
    </>
  );
};

export default ProductListScreen;
