"use client";
import { useEffect, useState, useCallback } from "react";
import styles from "./HomeShelf.module.scss";
import ProductCard from "../../Molecules/ProductCard/ProductCard";

import SectionTitle from "../../Atoms/SectionTitle/SectionTitle";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import SyncLoader from "react-spinners/SyncLoader";

interface ProductProps {
  id: number;
  productName: string;
  price: number;
  listPrice: number;
  imageUrl: string;
  stars: number;
  installments: Array<{
    quantity: number;
    value: number;
  }>;
}

const HomeShelf = () => {
  const [product, setProduct] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    slidesToScroll: 1,
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
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    getProducts();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <SyncLoader />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SectionTitle title="Mais Vendidos" />
      <div className={styles.carousel}>
        <div className={styles.embla} ref={emblaRef}>
          <div className={styles.embla__container}>
            {product.map((product) => (
              <div key={product.id} className={styles.embla__slide}>
                <ProductCard
                  key={product.id}
                  productName={product.productName}
                  listPrice={product.listPrice}
                  price={product.price}
                  stars={product.stars}
                  installments={product.installments}
                  imageUrl={product.imageUrl}
                  onBuy={() => {
                    console.log("Comprou");
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <button className={`${styles.embla__button} ${styles.embla__button__prev}`} onClick={scrollPrev}>
          ‹
        </button>
        <button className={`${styles.embla__button} ${styles.embla__button__next}`} onClick={scrollNext}>
          ›
        </button>
      </div>
    </div>
  );
};

export default HomeShelf;
