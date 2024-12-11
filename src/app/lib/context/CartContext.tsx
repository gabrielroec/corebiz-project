import { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  productId: number;
  productName: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.productId === product.productId);

      if (existingItem) {
        return prevCart.map((item) => (item.product.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.productId !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) =>
      quantity > 0
        ? prevCart.map((item) => (item.product.productId === productId ? { ...item, quantity } : item))
        : prevCart.filter((item) => item.product.productId !== productId)
    );
  };

  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getItemCount, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext); // Pega o contexto
  if (!context) {
    // Garante que o hook seja usado dentro de um CartProvider
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
