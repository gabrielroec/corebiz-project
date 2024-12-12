"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./HeroSlider.module.scss";
import deskbanner1 from "../../../../assets/desk1.png";
import deskbanner2 from "../../../../assets/desk2.png";
import mobbanner1 from "../../../../assets/mob1.png";
import mobbanner2 from "../../../../assets/mob2.png";
interface Slide {
  desktopImage: string;
  mobileImage: string;
  alt: string;
}

const slides: Slide[] = [
  {
    desktopImage: deskbanner1,
    mobileImage: mobbanner1,
    alt: "Criar ou migrar seu e-commerce",
  },
  {
    desktopImage: deskbanner2,
    mobileImage: mobbanner2,
    alt: "Expandir suas vendas online",
  },
];

const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
              <img src={isMobile ? slide.mobileImage : slide.desktopImage} alt={slide.alt} className={styles.slideImage} />
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
