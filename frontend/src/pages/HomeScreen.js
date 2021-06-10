import AboutSection from "../components/HomeScreen/AboutSection/AboutSection";
import Header from "../components/HomeScreen/LandingSection/LandingSection";
import FeatureSection from "../components/HomeScreen/FeatureSection/FeatureSection";
import ProductSection from "../components/HomeScreen/ProductSection/ProductSection";
import ReviewSection from "../components/HomeScreen/ReviewSection/ReviewSection";
import ContactSection from "../components/HomeScreen/ContactSection/ContactSection";
import FooterSection from "../components/HomeScreen/FooterSection/FooterSection";
import Navigation from "../components/navigation/Navigation";

const HomeScreen = () => {
  return (
    <>
      <Navigation />
      <Header />
      <AboutSection />
      <FeatureSection />
      <ProductSection />
      <ReviewSection />
      <ContactSection />
      <FooterSection />
    </>
  );
};

export default HomeScreen;
