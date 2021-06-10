import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "../src/styles/phosphor.css";
import App from "./pages/App";

import { store } from "./app/configureStore";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
