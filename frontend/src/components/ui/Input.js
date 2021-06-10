import styles from "./input.module.scss";

const Input = ({ type = "text", id, children, value, onChange, pattern }) => {
  return (
    <div className={styles.input}>
      <input
        className={styles.input_container}
        type={type}
        id={id}
        placeholder={children}
        required
        value={value}
        onChange={onChange}
        pattern={pattern}
      />
      <label htmlFor={id} className={styles.input_label}>
        {children.slice(6, children.length)}
      </label>
    </div>
  );
};

export default Input;
