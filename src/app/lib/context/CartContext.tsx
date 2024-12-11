import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "../types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getItemCount: () => number; // Função para contar os itens no carrinho
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const saveCartToLocalStorage = (updatedCart: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.productId === product.productId);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.product.productId === product.productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, { product, quantity: 1 }];
      }
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.product.productId !== productId);
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => (item.product.productId === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0); // Remove itens com quantidade 0
      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  // Função para contar o número total de itens no carrinho
  const getItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        getItemCount, // Expondo a função no contexto
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
