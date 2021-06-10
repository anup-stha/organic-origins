import {
  deleteUser,
  listUser,
  updateUser,
  userUpdateReset,
} from "app/slice/userListSlice";

import Loader from "components/ui/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./user-list.module.scss";
import Modal from "components/Modals/userEditModal";

const UserList = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users.userList);

  const { info } = users;
  const userDelete = useSelector((state) => state.users.userList.userDelete);
  const updateUserSuccess = useSelector(
    (state) => state.users.userList.userUpdate.success
  );

  const { success, loading: deleteLoading } = userDelete;

  useEffect(() => {
    if (updateUserSuccess) {
      dispatch(userUpdateReset());
    }
    dispatch(listUser());
  }, [success, deleteLoading, dispatch, updateUserSuccess]);

  return (
    <div>
      <div>
        {deleteLoading ? (
          <Loader />
        ) : (
          <table className={styles.user_table}>
            <thead className={styles.user_thead}>
              <tr className={[styles.table_heading, styles.user_tr].join(" ")}>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Admin</td>

                <td></td>
              </tr>
            </thead>

            {info.map((item) => (
              <User user={item} key={item._id} />
            ))}
          </table>
        )}
      </div>
    </div>
  );
};

const User = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const dispatch = useDispatch();
  const id = user._id;
  const confirmHandler = () => {
    setIsOpen(true);
  };
  const logOutHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, { _id: user._id, name, email, isAdmin }));
    setIsOpen(false);
  };

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  const cancelHandler = (id) => {
    setIsOpen(false);
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  };
  return (
    <tbody key={user._id} className={styles.user_tbody}>
      <tr className={styles.user_tr}>
        <td className={styles.user_td}>{user._id}</td>
        <td className={styles.user_td}>{user.name}</td>
        <td className={styles.user_td}>{user.email}</td>
        <td className={styles.user_td}>
          {user.isAdmin ? (
            <div className={styles.table_paid}>
              <i className="ph-check-circle"></i>
            </div>
          ) : (
            <div className={styles.table_unpaid}>
              <i className="ph-x-circle"></i>
            </div>
          )}
        </td>

        <td className={styles.user_td}>
          <div className={styles.grid_row_baseline}>
            <div className={styles.edit} onClick={confirmHandler}>
              <i className="ph-note-pencil-light"></i>
            </div>

            <button
              className={styles.delete}
              onClick={() => deleteUserHandler(user._id)}
            >
              <i class="ph-trash-light"></i>
            </button>
            <Modal
              open={isOpen}
              onClose={(e) => logOutHandler(e)}
              onCancel={() => cancelHandler()}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
            ></Modal>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default UserList;
