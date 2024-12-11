import HeroSlider from "../components/Organism/HeroSlider/HeroSlider";
import ProducCarousel from "../components/Organism/ProductCarousel/ProducCarousel";

const Home = () => {
  return (
    <>
      <div>
        <HeroSlider />
      </div>
      <div>
        <p>Mais vendidos</p>
        <ProducCarousel />
      </div>
    </>
  );
};

export default Home;
