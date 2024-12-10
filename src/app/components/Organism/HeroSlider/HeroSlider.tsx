"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./HeroSlider.module.scss";
import bannerDeskOne from "../../../../assets/desk1.png";
import bannerDeskTwo from "../../../../assets/desk2.png";

interface Slide {
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    image: bannerDeskOne,
    alt: "Criar ou migrar seu e-commerce",
  },
  {
    image: bannerDeskTwo,
    alt: "Expandir suas vendas online",
  },
];

const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  return (
    <div className={styles.heroWrapper}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {slides.map((slide, index) => (
            <div className={styles.emblaSlide} key={index}>
              <img src={slide.image} alt={slide.alt} className={styles.slideImage} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === selectedIndex ? styles.active : ""}`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
