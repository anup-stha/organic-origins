import {
  deleteProduct,
  loadProductList,
  productUpdateReset,
} from "app/slice/productListSlice";
import Loader from "components/ui/Loader";

import Button from "components/ui/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./admin-product-list.module.scss";
import Modal from "components/Modals/adminProductModal";
import { createProduct } from "app/slice/productListSlice";
import Paginate from "components/Paginate";
import Message from "components/Message/Message";

const AdminProductListScreen = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pageNumber = match.params.pageNumber;
  const productList = useSelector(
    (state) => state.products.productList.products
  );
  const { list, pages, page } = productList;

  const productDelete = useSelector(
    (state) => state.products.productList.productDelete
  );
  const productCreate = useSelector(
    (state) => state.products.productList.productCreate
  );
  const productUpdate = useSelector(
    (state) => state.products.productList.productUpdate
  );
  const {
    loading: createLoading,
    error: createError,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  const {
    loading: updateLoading,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const { loading: deleteLoading, success: deleteSuccess } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductList("", pageNumber));
    dispatch(productUpdateReset());
  }, [dispatch, deleteSuccess, successUpdate, successCreate, pageNumber]);

  const confirmHandler = () => {
    dispatch(createProduct());
    setIsOpen(true);
  };
  const cancelHandler = () => {
    dispatch(deleteProduct(createdProduct._id));
    setIsOpen(false);
  };

  const createProductHandler = (e) => {
    e.preventDefault();

    setIsOpen(false);
  };

  return (
    <div className={styles.admin_product_container}>
      <div className={styles.product_create}>
        <Button buttonClass="btn btn__green" onClick={confirmHandler}>
          Create Product
        </Button>
        {isOpen ? (
          <Modal
            open={isOpen}
            onClose={(e) => createProductHandler(e)}
            onCancel={() => cancelHandler()}
            id={createdProduct._id}
            action="create"
          />
        ) : null}
      </div>
      {deleteLoading || createLoading || updateLoading ? (
        <Loader />
      ) : createError ? (
        <Message info="error">{createError}</Message>
      ) : errorUpdate ? (
        <Message info="error">{errorUpdate}</Message>
      ) : (
        <table className={styles.product_table}>
          <thead className={styles.product_thead}>
            <tr className={[styles.table_heading, styles.product_tr].join(" ")}>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Category</td>
              <td>Brand</td>

              <td></td>
            </tr>
          </thead>

          {list.map((product) => (
            <Product product={product} key={product._id} />
          ))}
        </table>
      )}
      <Paginate pages={pages} page={page} keyword={""} isAdmin={true} />
    </div>
  );
};

const Product = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const confirmHandler = () => {
    setIsOpen(true);
  };
  const cancelHandler = (id) => {
    setIsOpen(false);
  };

  const createProductHandler = (e) => {
    e.preventDefault();

    setIsOpen(false);
  };
  return (
    <tbody key={product._id} className={styles.product_tbody}>
      <tr className={styles.product_tr}>
        {isOpen ? (
          <Modal
            open={isOpen}
            onClose={(e) => createProductHandler(e)}
            onCancel={() => cancelHandler()}
            id={product._id}
          />
        ) : null}
        <td className={styles.product_td}>{product._id}</td>
        <td
          className={[styles.product_td, styles.grid_row_alignItems].join(" ")}
        >
          <img
            src={product.image}
            alt={product.name}
            className={styles.product_image}
          />
          {product.name}
        </td>
        <td className={styles.product_td}>Rs. {product.price}</td>
        <td className={styles.product_td}>{product.brand}</td>
        <td className={styles.product_td}>{product.category}</td>
        <td className={styles.product_td}>
          <div className={styles.grid_row_baseline}>
            <div className={styles.edit} onClick={confirmHandler}>
              <i className="ph-note-pencil-light"></i>
            </div>

            <button
              className={styles.delete}
              onClick={() => deleteHandler(product._id)}
            >
              <i class="ph-trash-light"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default AdminProductListScreen;
