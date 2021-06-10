import styles from "./contact-section.module.scss";
import Form from "../../ui/Form";

const ContactSection = () => {
  return (
    <section className={styles.section_contact} id="contact">
      <div className={styles.row}>
        <div className={styles.contact}>
          <div className={styles.contact_form}>
            <div className={styles.u_margin_bottom_medium}>
              <h2 className={styles.headingSecondary}>CONTACT US NOW</h2>
            </div>
            <Form></Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
