import HomeScreen from "./HomeScreen";
import ProductListScreen from "./ProductScreen/ProductListScreen";
import ProductDetailScreen from "./ProductScreen/ProductDetailScreen";

import CartScreen from "./cart";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import ShippingScreen from "./shipping";
import PaymentScreen from "./payment";
import PlaceOrderScreen from "./placeOrder";
import OrderScreen from "./order";
import UserProfileScreen from "./profile";
import AdminScreen from "./profile/admin";

import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
const App = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/products" component={ProductListScreen} exact />
      <Route
        path="/products/search/:keyword"
        component={ProductListScreen}
        exact
      />
      <Route
        path="/products/search/:keyword/page/:pageNumber"
        component={ProductListScreen}
      />
      <Route path="/products/page/:pageNumber" component={ProductListScreen} />
      <Route path="/product/:id" component={ProductDetailScreen} />
      <Route path="/cart" component={CartScreen} exact />
      <Route path="/login" component={LoginScreen} exact />
      <Route path="/register" component={RegisterScreen} exact />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} exact />
      <Route exact path="/placeorder">
        {cartItems !== 0 ? (
          <Route path="/placeorder" component={PlaceOrderScreen} exact />
        ) : (
          <Redirect to="/cart" />
        )}
      </Route>

      <Route path="/order/:id" component={OrderScreen} exact />
      <Route path="/profile" component={UserProfileScreen} exact />
      <Route path="/admin" component={AdminScreen} exact />
      <Route path="/admin/productlist/:pageNumber" component={AdminScreen} />
    </>
  );
};

export default App;
