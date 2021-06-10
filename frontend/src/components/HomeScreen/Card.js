import Rating from "components/Rating";
import styles from "./card.module.scss";

const Card = ({
  color,
  heading,
  price,
  image,
  onClick,
  category = "Organic Product",
  brand = "Organic Origins",
  rating = 5,
}) => {
  console.log(image);
  const imgStyles = {
    backgroundImage: `
      linear-gradient(
          to right bottom,#ffb900,
            #ff7730
        ),
        url(${image.replace(/\\/g, "/") ? image.replace(/\\/g, "/") : image}) 
    `,
  };

  return (
    <div className={styles.card}>
      <div className={[styles.card_side, styles.card_side__front].join(" ")}>
        <div
          className={
            color === "orange"
              ? [styles.card_picture].join(" ")
              : color === "blue"
              ? [styles.card_picture, styles.card_picture__3].join(" ")
              : [styles.card_picture, styles.card_picture__2].join(" ")
          }
          style={color === "orange" ? imgStyles : null}
        >
          &nbsp;
        </div>
        <h4 className={styles.card_heading}>
          <span
            className={
              color === "orange"
                ? [styles.card_heading_span, styles.card_heading_span__1].join(
                    " "
                  )
                : color === "blue"
                ? [styles.card_heading_span, styles.card_heading_span__3].join(
                    " "
                  )
                : [styles.card_heading_span, styles.card_heading_span__2].join(
                    " "
                  )
            }
          >
            {heading}
          </span>
        </h4>
        <div className={styles.card_details}>
          <ul>
            <li>{category}</li>
            <li>{brand}</li>
            <li style={{ textAlign: "center" }}>
              <Rating value={rating}></Rating>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          color === "orange"
            ? [
                styles.card_side,
                styles.card_side__back,
                styles.card_side__back__1,
              ].join(" ")
            : color === "blue"
            ? [
                styles.card_side,
                styles.card_side__back,
                styles.card_side__back__3,
              ].join(" ")
            : [
                styles.card_side,
                styles.card_side__back,
                styles.card_side__back__2,
              ].join(" ")
        }
      >
        <div className={styles.card_cta}>
          <div className={styles.card_priceBox}>
            <p className={styles.card_price__only}>Only</p>
            <p className={styles.card_price__value}>Rs. {price}</p>
          </div>
          <button
            className={[styles.btn, styles.btn__white].join(" ")}
            onClick={onClick}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
