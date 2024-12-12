import React, { createContext, useState, useContext, useEffect } from "react";

interface CartProduct {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartContextType {
  products: CartProduct[];
  allQuantity: number;
  total: number;
  addProduct: (product: CartProduct) => void;
  removeProduct: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const addProduct = (product: CartProduct) => {
    const existingProduct = products.find((p) => p.id === product.id);

    if (existingProduct) {
      setProducts(products.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)));
    } else {
      setProducts([...products, { ...product, quantity: 1 }]);
    }
  };

  const removeProduct = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const increaseQuantity = (productId: number) => {
    setProducts(products.map((product) => (product.id === productId ? { ...product, quantity: product.quantity + 1 } : product)));
  };

  const decreaseQuantity = (productId: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
      )
    );
  };

  const allQuantity = products.reduce((total, product) => total + product.quantity, 0);
  console.log(allQuantity);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        products,
        total: calculateTotal(),
        addProduct,
        removeProduct,
        increaseQuantity,
        decreaseQuantity,
        allQuantity,
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
