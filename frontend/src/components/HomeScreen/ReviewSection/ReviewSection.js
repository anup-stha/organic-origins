import Button from "../../ui/Button";
import styles from "./review-section.module.scss";

const ReviewSection = () => {
  return (
    <section className={styles.section_review} id="review">
      <div className={styles.bg_video}>
        <video className={styles.bg_video__content} autoPlay muted loop>
          <source src="images/video.webm" type="video/webm"></source>
          <source src="images/video.mp4" type="video/mp4"></source>
          Your browser is not supported!.
        </video>
      </div>
      <div
        className={[styles.u_center_text, styles.u_margin_bottom_big].join(" ")}
      >
        <h2 className={styles.headingSecondary}>
          We make people genuinely happy
        </h2>
      </div>
      <div className={styles.row}>
        <div className={styles.review}>
          <figure className={styles.review_shape}>
            <img
              src="images/nat-8.jpg"
              alt="Person one"
              className={styles.review_image}
            />
            <figcaption className={styles.review_caption}>
              Mary Smith
            </figcaption>
          </figure>
          <div className={styles.review_text}>
            <h3
              className={[
                styles.headingTertiary,
                styles.u_margin_bottom_small,
              ].join(" ")}
            >
              I had the best week of my life
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              optio quae eligendi, laudantium assumenda amet molestiae explicabo
              soluta quia recusandae. Dicta cumque cum quaerat quas magni, minus
              iure et unde.
            </p>
          </div>
        </div>
        <div className={styles.review}>
          <figure className={styles.review_shape}>
            <img
              src="images/nat-9.jpg"
              alt="Person one"
              className={styles.review_image}
            />
            <figcaption className={styles.review_caption}>Joe Biden</figcaption>
          </figure>
          <div className={styles.review_text}>
            <h3
              className={[
                styles.headingTertiary,
                styles.u_margin_bottom_small,
              ].join(" ")}
            >
              I had the best week of my life
            </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              optio quae eligendi, laudantium assumenda amet molestiae explicabo
              soluta quia recusandae. Dicta cumque cum quaerat quas magni, minus
              iure et unde.
            </p>
          </div>
        </div>
      </div>
      <div
        className={[styles.u_center_text, styles.u_margin_top_big].join(" ")}
      >
        <Button buttonClass="btn btn__green">Read More &rarr;</Button>
      </div>
    </section>
  );
};

export default ReviewSection;
