import styles from "./message.module.scss";

const Message = ({ children, info }) => {
  return (
    <div
      className={[
        styles.message_container,
        info === "error" && styles.message_container_error,
        info === "success" && styles.message_container_success,
        info === "warning" && styles.message_container_warning,
      ].join(" ")}
    >
      {info === "error" && <i className="ph-x-circle-light"></i>}
      {info === "warning" && <i className="ph-warning-circle-light"></i>}
      {info === "success" && <i className="ph-check-circle-light"></i>}

      {children}
    </div>
  );
};

export default Message;
