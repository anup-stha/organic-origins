import FeatureBox from "./FeatureBox";
import styles from "./feature-section.module.scss";

const FeatureScreen = () => {
  return (
    <section className={styles.sectionFeatures}>
      <div className={styles.row}>
        <FeatureBox
          headingText=" Explore the World"
          subText=" Lorem ipsum domet  Lorem ipsum dolor sit amet coconsectetur adipisicing elit. Sed mags"
          icon="basic-world"
        />
        <FeatureBox
          headingText=" Meet Nature"
          subText=" Lorem ipsulor sit amet Lorem ipsum dolor sit amet coconsectetur adipisicing elit. Sed mags"
          icon="basic-compass"
        />
        <FeatureBox
          headingText="Find Your Way"
          subText=" Lorem ipm dolor sit amet Lorem ipsum dolor sit amet co consectetur adipisicing elit. Sed mags"
          icon="basic-map"
        />
        <FeatureBox
          headingText="Live A healthier life"
          subText=" Lorsum dolor sit amet Lorem ipsum dolor sit amet co consectetur adipisicing elit. Sed mags"
          icon="basic-heart"
        />
      </div>
    </section>
  );
};

export default FeatureScreen;
