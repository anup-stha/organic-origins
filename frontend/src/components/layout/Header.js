import styles from "./Header.module.scss";

import { FiSearch } from "react-icons/fi";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import { Badge } from "@material-ui/core";
// import { useSelector } from "react-redux";
const Header = () => {
  const history = useHistory();
  // const cartItem = useSelector((state) => state.cart.cartItems);
  const [keyword, setKeyword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/search/${keyword.trim()}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <header className={styles.header_container}>
      <div className={styles.header_logo}>
        <h1>
          organic<span>Origins</span>
        </h1>
      </div>
      <form className={styles.header_search} onSubmit={submitHandler}>
        <input
          className={styles.header_search_input}
          placeholder="Search for products"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={submitHandler} className={styles.header_search_button}>
          <FiSearch size={25} />
        </button>
      </form>
      <div className={styles.header_nav}>
        <ul className={styles.header_nav_list}>
          <li>
            <Link to="/cart">
              {/* <Badge badgeContent={cartItem.length} color="primary"> */}
              <AiOutlineShoppingCart size={25} />
              {/* </Badge> */}
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <CgProfile size={25} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
