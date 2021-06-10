import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";
import "./user-edit-modal.scss";
import Button from "components/ui/Button";
import Input from "components/ui/Input";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",

  zIndex: 1000,
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
  name,
  setName,
  email,
  setEmail,
  isAdmin,
  setIsAdmin,
}) => {
  if (!open) return null;

  return ReactDom.createPortal(
    <div>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} className="user_modal_container">
        <h1 className="heading_3">Update User Details</h1>
        <form className="user_form_group">
          <div className="u_margin_bottom_small">
            <Input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            >
              Enter Name
            </Input>
          </div>
          <div className="u_margin_bottom_small">
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            >
              Enter Email
            </Input>
          </div>
          <label class="checkbox">
            <span class="checkbox__input">
              <input
                type="checkbox"
                name="checkbox"
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked);
                  console.log(e.target.checked);
                }}
              />
              <span class="checkbox__control">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    d="M1.73 12.91l6.37 6.37L22.79 4.59"
                  />
                </svg>
              </span>
            </span>
            <span class="radio__label">Admin</span>
          </label>

          <Button buttonClass="btn btn__green" onClick={(e) => onClose(e)}>
            Submit
          </Button>
          <Button buttonClass="btn btn__white " onClick={onCancel}>
            Cancel
          </Button>
        </form>

        <div className="grid_row">
          {/* <Button
            onClick={onCancel}
            buttonClass="btn btn__green"
            style={{ border: "1px solid #F32013", color: "#f32013" }}
          >
            {onCancelText}
          </Button> */}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;

Modal.propTypes = {
  onCloseText: PropTypes.string,
  onCancelText: PropTypes.string,
};
