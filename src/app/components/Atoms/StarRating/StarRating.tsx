import styles from "./StarRating.module.scss";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  return (
    <div className={styles.container}>
      {[...Array(maxRating)].map((_, index) => (
        <Star size={16} className={`${styles.star} ${index < rating ? styles.filled : ""}`} key={index} />
      ))}
    </div>
  );
};

export default StarRating;
