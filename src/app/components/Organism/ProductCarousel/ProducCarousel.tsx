"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import styles from "./ProductCarousel.module.scss";
import { Product } from "../../../lib/types";
import ProductCard from "../ProductCard/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
const ProducCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 4,
    breakpoints: {
      "(max-width: 768px)": { slidesToScroll: 1 },
    },
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("https://corebiz-test-server.onrender.com/api/v1/products");
        setProducts(response.data);
        console.log(products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div>
        <div>
          {[...Array(4)].map((_, index) => (
            <div key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <button onClick={scrollPrev} className={`${styles.navButton} ${styles.prevButton}`}>
          <ChevronLeft />
        </button>
        <div className={styles.carousel} ref={emblaRef}>
          <div className={styles.carouselContainer}>
            {products.map((product) => {
              return (
                <div key={product.productId} className={styles.slide}>
                  <ProductCard product={product} onBuy={() => {}} />
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={scrollNext} className={`${styles.navButton} ${styles.nextButton}`}>
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProducCarousel;
