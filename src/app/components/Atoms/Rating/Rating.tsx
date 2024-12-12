import styles from "./Rating.module.scss";

interface RatingProps {
  stars: number;
}

const Rating = ({ stars }: RatingProps) => {
  return (
    <div className={styles.rating}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={`${styles.star} ${index < stars ? styles.filledstars : styles.emptystars}`}>
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
