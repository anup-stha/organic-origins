import styles from "./form.module.scss";
import Button from "./Button";

const Form = () => {
  return (
    <form action="#" className={styles.form}>
      <div className={styles.form_group}>
        <input
          type="text"
          className={styles.form_input}
          placeholder="Full Name"
          id="name"
          required
        />
        <label htmlFor="name" className={styles.form_label}>
          Full Name
        </label>
      </div>
      <div className={styles.form_group}>
        <input
          type="email"
          className={styles.form_input}
          placeholder="Email"
          id="email"
          required
        />
        <label htmlFor="email" className={styles.form_label}>
          Email
        </label>
      </div>
      <div className={styles.form_group}>
        <textarea
          type="text"
          className={[styles.form_input, styles.form_textarea].join(" ")}
          placeholder="Your Message"
          id="message"
          required
        />
        <label htmlFor="message" className={styles.form_label}>
          Your Message
        </label>
      </div>
      <Button buttonClass="btn btn__green btn-30" type="button">
        SEND YOUR MESSAGE{" "}
      </Button>
    </form>
  );
};

export default Form;
