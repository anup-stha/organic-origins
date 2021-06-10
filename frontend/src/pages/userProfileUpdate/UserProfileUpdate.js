import Button from "components/ui/Button";
import { useState } from "react";
import styles from "../register/register.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetails } from "app/slice/userSlice";

const UserProfileUpdate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user.currentUser);
  const { info } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
    dispatch(updateUserDetails({ id: info._id, name, email, password }));
  };
  return (
    <form onSubmit={submitHandler}>
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
        <label htmlFor="confirmPassword" className={styles.form_label}>
          Confirm PassWord
        </label>
      </div>
      <div className={styles.form_forgetPassword}>
        <Button buttonClass="btn btn__orange">Update</Button>
      </div>
    </form>
  );
};

export default UserProfileUpdate;
