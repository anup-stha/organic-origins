import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./admin-product-modal.scss";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { loadProductDetails } from "app/slice/productDetailSlice";
import Loader from "components/ui/Loader";
import { updateProduct } from "app/slice/productListSlice";
import axios from "axios";

const MODAL_STYLES = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  zIndex: 1000,
  overflowY: "auto",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const Modal = ({
  open,
  children,
  onClose,
  onCancel,
  onCloseText = "Yes",
  onCancelText = "No",
  id,
  action = "update",
}) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productDetails);

  // const createdProduct = useSelector(
  //   (state) => state.products.productList.productCreate.product
  // );

  const { product, loading } = products;
  useEffect(() => {
    dispatch(loadProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProductName(product.name || "");
    setProductPrice(product.price || 0);
    setProductImage(product.image || "");
    setProductBrand(product.brand || "");
    setCountInStock(product.countInStock || 0);
    setProductCategory(product.category || "");
    setProductDescription(product.description || "");
  }, [
    product.name,
    product.image,
    product.price,
    product.brand,
    product.countInStock,
    product.category,
    product.description,
  ]);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const productUpdateHandler = () => {
    dispatch(
      updateProduct({
        _id: id,
        name: productName,
        price: productPrice,
        image: productImage,
        brand: productBrand,
        category: productCategory,
        description: productDescription,
        countInStock,
      })
    );
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setProductImage(data);
      setUploading(false);
      setUploaded(true);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  if (!open) return null;

  return ReactDom.createPortal(
    <div>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} className="admin_modal_container">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="heading_3">Create New Product</h1>
            <form className="form_group">
              <Input
                type="name"
                id="name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              >
                Enter Product Name
              </Input>
              <div className="grid_row_alignItems_1 ">
                <div className="width-50">
                  <Input
                    type="number"
                    id="price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  >
                    Enter Price
                  </Input>
                </div>
                <div className="width-50">
                  <Input
                    type="number"
                    id="stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  >
                    Enter Stock
                  </Input>
                </div>
              </div>

              <div className="grid_row_alignItems_1">
                <div class="file-input">
                  <input
                    type="file"
                    id="file"
                    className="file"
                    onChange={uploadFileHandler}
                  />
                  <label for="file">
                    {uploading && <Loader />}
                    <i className="ph-upload-simple-light"></i>
                    <p className="paragraph_2">
                      {!uploaded ? "Upload An Image" : "Image Uploaded"}
                    </p>
                  </label>
                </div>
                <div className="input-file">
                  <Input
                    type="name"
                    id="image"
                    value={productImage}
                    onChange={(e) => setProductImage(e.target.value)}
                  >
                    Enter Image
                  </Input>
                </div>
                <div className="width-25">
                  <Input
                    type="name"
                    id="brand"
                    value={productBrand}
                    onChange={(e) => setProductBrand(e.target.value)}
                  >
                    Enter Brand
                  </Input>
                </div>
                <div className="width-25">
                  <Input
                    type="name"
                    id="category"
                    value={productCategory}
                    onChange={(e) => setProductCategory(e.target.value)}
                  >
                    Enter Category
                  </Input>
                </div>
              </div>
              <div className="grid_row"></div>

              <textarea
                type="text"
                className="form_input form_textarea"
                placeholder="Your Message"
                id="message"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              <label htmlFor="message" className="form_label">
                Enter Description
              </label>

              <Button
                buttonClass="btn btn__green"
                onClick={(e) => {
                  onClose(e);
                  productUpdateHandler();
                }}
              >
                Submit
              </Button>
              <Button buttonClass="btn btn__white " onClick={onCancel}>
                Cancel
              </Button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.getElementById("portal1")
  );
};

export default Modal;

Modal.propTypes = {
  onCloseText: PropTypes.string,
  onCancelText: PropTypes.string,
};
