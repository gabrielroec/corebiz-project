import HeroSlider from "../components/Molecules/HeroSlider/HeroSlider";
import Footer from "../components/Organism/Footer/Footer";
import Header from "../components/Organism/Header/Header";
import HomeShelf from "../components/Organism/HomeShelf/HomeShelf";
import NewsletterForm from "../components/Organism/NewsletterForm/NewsletterForm";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSlider />
      <HomeShelf />
      <NewsletterForm />
      <Footer />
    </>
  );
};

export default Home;
