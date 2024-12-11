import { Product } from "../../../lib/types";
import StarRating from "../../Atoms/StarRating/StarRating";

interface ProductCardProps {
  product: Product;
  onBuy: (productId: number) => void;
}
const ProductCard = ({ product, onBuy }: ProductCardProps) => {
  return (
    <div>
      <div>
        {product.listPrice && <span>OFF</span>}
        <img src={product.imageUrl} alt={product.productName} width={216} height={216} loading="lazy" />
      </div>
      <div>
        <h3>{product.productName}</h3>
        <StarRating rating={product.stars} maxRating={5} />
        <button onClick={() => onBuy(product.productId)}>Comprar</button>
      </div>
    </div>
  );
};

export default ProductCard;
