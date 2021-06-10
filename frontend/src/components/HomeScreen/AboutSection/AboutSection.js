import styles from "./about-section.module.scss";
import Button from "../../ui/Button";

const AboutScreen = () => {
  return (
    <section className={styles.section_about} id="about">
      <div
        className={[styles.u_center_text, styles.u_margin_bottom_big].join(" ")}
      >
        <h2 className={styles.headingSecondary}>
          Awesome Cosmetics Made In Nepal
        </h2>
      </div>
      <div className={styles.row}>
        <div className={styles.col_1_of_2}>
          <h3
            className={[
              styles.headingTertiary,
              styles.u_margin_bottom_small,
            ].join(" ")}
          >
            Lorem ipsum, dolor sit amet consectetur a
          </h3>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            expedita perferendis id rem rerum quod, quo iusto autem? Architecto
            maxime labore maiores ipsam
          </p>
          <h3
            className={[
              styles.headingTertiary,
              styles.u_margin_bottom_small,
            ].join(" ")}
          >
            You are going to love this
          </h3>
          <p className={styles.paragraph}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            expedita perferendis id rem rerum quod, quo iusto autem? Architecto
            maxime
          </p>
          <Button buttonClass="btn btn__green">Learn More &rarr; </Button>
        </div>
        <div className={styles.col_1_of_2}>
          <div className={styles.composition}>
            <img
              src="/images/nat-1.jpg"
              alt="About 1"
              className={[
                styles.composition_photo,
                styles.composition_photo__p1,
              ].join(" ")}
            />
            <img
              src="/images/nat-2-large.jpg"
              alt="About 2"
              className={[
                styles.composition_photo,
                styles.composition_photo__p2,
              ].join(" ")}
            />
            <img
              src="/images/nat-3-large.jpg"
              alt="About 3"
              className={[
                styles.composition_photo,
                styles.composition_photo__p3,
              ].join(" ")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutScreen;
