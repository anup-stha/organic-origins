import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./profile.module.scss";
import { logoutUser } from "app/slice/userSlice";
import Header from "components/layout/Header";

import OrderList from "pages/orderlist/OrderList";
import Button from "components/ui/Button";
import UserProfileUpdate from "pages/userProfileUpdate/UserProfileUpdate";

const Profile = () => {
  const history = useHistory();
  const options = ["Profile", "Orders", "Settings"];
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const user = useSelector((state) => state.users.user.currentUser);
  const { info } = user;
  useEffect(() => {
    if (!info) {
      history.push("/login");
    }
  }, [info, history]);
  return (
    <>
      <div className={styles.admin_container}>
        <div className={styles.admin_nav}>
          <ul>
            {options.map((item, index) => (
              <li
                key={index}
                className={[
                  styles.tooltip,
                  item === selectedOption
                    ? styles.admin_nav_list_item_selected
                    : null,
                ].join(" ")}
                onClick={() => setSelectedOption(item)}
              >
                <i
                  className={
                    item === "Profile"
                      ? "ph-house-simple-light"
                      : item === "Orders"
                      ? "ph-check-square-light"
                      : "ph-gear-six-light"
                  }
                ></i>
                <p className={styles.tooltiptext}>{item}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.admin_content}>
          <div className={styles.gridCol}>
            <Header />
            <div className={styles.admin_content_container}>
              <h1 className={styles.heading_2}>
                User Profile - {selectedOption}
              </h1>

              {selectedOption === "Profile" ? (
                <div>
                  <h1 className={styles.heading_1}>{info && info.name}</h1>
                  <h1 className={styles.heading_2}>{info && info.email}</h1>
                  <Button
                    buttonClass="btn btn__green"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    LOG OUT
                  </Button>
                </div>
              ) : selectedOption === "Orders" ? (
                <div>
                  <OrderList />
                </div>
              ) : (
                <div>
                  <UserProfileUpdate />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
