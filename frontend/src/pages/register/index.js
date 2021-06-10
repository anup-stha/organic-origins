import Header from "../../components/layout/Header";
import Footer from "../../components/HomeScreen/FooterSection/FooterSection";
import styles from "./register.module.scss";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../app/slice/userSlice";
import Loader from "../../components/ui/Loader";
import queryString from "query-string";

import { useHistory, useLocation } from "react-router-dom";
import Message from "components/Message/Message";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.users.user.newUser);
  const { loading, info, error } = userRegister;
  const currentUser = useSelector((state) => state.users.user.currentUser.info);
  const location = useLocation();
  const history = useHistory();
  const redirect = queryString.parse(location.search).redirect
    ? queryString.parse(location.search).redirect
    : "/";

  useEffect(() => {
    if (currentUser) {
      history.push(redirect);
    }
  }, [history, redirect, currentUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name is required");
    } else if (!email) {
      setMessage("Email is required");
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser(name, email, password));

      setMessage("");
    }
    setName("");
    setEmail("");
    setMessage("");
    setPassword("");
    setConfirmPassword("");
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
              <h1 className={styles.headingSecondary_plain}>
                Register for free
              </h1>
              {message && <Message info="error">{message}</Message>}
              {error && <Message info="error">{error}</Message>}
              <form
                action="#"
                className={[styles.form, styles.login_form].join(" ")}
                onSubmit={submitHandler}
              >
                <div className={styles.form_group}>
                  <input
                    type="name"
                    className={styles.form_input}
                    placeholder="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="name" className={styles.form_label}>
                    Name
                  </label>
                </div>

                <div className={styles.form_group}>
                  <input
                    type="email"
                    className={styles.form_input}
                    placeholder="Email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="email" className={styles.form_label}>
                    Email
                  </label>
                </div>
                <div className={styles.form_group}>
                  <input
                    type="password"
                    className={styles.form_input}
                    placeholder="Password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="password" className={styles.form_label}>
                    Password
                  </label>
                </div>
                <div className={styles.form_group}>
                  <input
                    type="password"
                    className={styles.form_input}
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={styles.form_label}
                  >
                    Confirm PassWord
                  </label>
                </div>
                <div className={styles.form_forgetPassword}>
                  <Button buttonClass="btn btn__orange">Sign Up</Button>
                </div>
              </form>
              <div className={styles.line}></div>
              <div className={styles.registerOption}>
                <div className={styles.paragraphOther_2}>
                  Already have an account?
                </div>
                <span
                  className={styles.paragraphOther_2_span}
                  onClick={() => history.push(`login?redirect=${redirect}`)}
                >
                  Sign In
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

export default RegisterScreen;
