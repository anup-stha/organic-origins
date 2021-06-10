import Header from "../../components/layout/Header";
import Footer from "../../components/HomeScreen/FooterSection/FooterSection";
import styles from "./login.module.scss";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/slice/userSlice";
import Loader from "../../components/ui/Loader";
import queryString from "query-string";

import { useHistory, useLocation } from "react-router-dom";
import Message from "components/Message/Message";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.users.user.currentUser);

  const { loading, info, error } = userLogin;
  const location = useLocation();
  const history = useHistory();
  const redirect = queryString.parse(location.search).redirect
    ? queryString.parse(location.search).redirect
    : "/";

  useEffect(() => {
    if (info) {
      history.push(redirect);
    }
  }, [info, history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.container}>
          <div className={styles.login}>
            <div className={styles.login_container}>
              <h1 className={styles.headingSecondary_plain}>Get Started</h1>
              {error && <Message info="error">{error}</Message>}
              <form
                action="#"
                className={[styles.form, styles.login_form].join(" ")}
                onSubmit={submitHandler}
              >
                <div className={styles.form_group}>
                  <input
                    type="email"
                    className={styles.form_input}
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="name" className={styles.form_label}>
                    Email
                  </label>
                </div>
                <div className={styles.form_group}>
                  <input
                    type="password"
                    className={styles.form_input}
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="password" className={styles.form_label}>
                    PassWord
                  </label>
                </div>
                <div className={styles.form_forgetPassword}>
                  <Button buttonClass="btn btn__orange">Sign In</Button>
                  <span>Forget Password?</span>
                </div>
              </form>
              <div className={styles.line}></div>
              <div className={styles.registerOption}>
                <div className={styles.paragraphOther_2}>
                  Don't have an account?
                </div>
                <span
                  className={styles.paragraphOther_2_span}
                  onClick={() => history.push(`register?redirect=${redirect}`)}
                >
                  Create Account
                </span>
                `
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Login;
