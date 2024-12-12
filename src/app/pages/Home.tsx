import HeroSlider from "../components/Molecules/HeroSlider/HeroSlider";
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
    </>
  );
};

export default Home;
