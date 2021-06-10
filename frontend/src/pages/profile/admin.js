import UserList from "pages/userlist/UserList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./profile.module.scss";
import { logoutUser } from "app/slice/userSlice";
import Header from "components/layout/Header";
import AdminProductListScreen from "pages/adminproductList";
import Button from "components/ui/Button";
import AllOrderScreen from "pages/allOrders/AllOrderScreen";

const Profile = ({ match }) => {
  const history = useHistory();
  console.log();
  const options = ["Profile", "Users", "Orders", "Products", "Settings"];
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(
    match.url.includes("productlist") ? options[3] : options[0]
  );
  const user = useSelector((state) => state.users.user.currentUser);
  const { info } = user;
  useEffect(() => {
    if (!info || !info.isAdmin) {
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
                      : item === "Users"
                      ? "ph-users-light"
                      : item === "Products"
                      ? "ph-package-light"
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
                Admin Panel - {selectedOption}
              </h1>

              {selectedOption === "Profile" ? (
                <div>
                  Dashboard
                  <div>
                    <Button
                      buttonClass="btn btn__orange"
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Log Out
                    </Button>
                  </div>
                </div>
              ) : selectedOption === "Orders" ? (
                <div>
                  <AllOrderScreen />
                </div>
              ) : selectedOption === "Users" ? (
                <UserList />
              ) : selectedOption === "Products" ? (
                <AdminProductListScreen match={match} />
              ) : (
                <div>Settings</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
