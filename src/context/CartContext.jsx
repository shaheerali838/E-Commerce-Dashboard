import { createContext, useContext, useState, useCallback } from "react";

// 1. Create the context
const CartContext = createContext();

// 2. Export the hook
export const useCart = () => useContext(CartContext);

// 3. Export the provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to cart, or increment quantity if it already exists
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // Respect stock limit
        if (existing.quantity >= product.piece) return prev;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  // Remove a product entirely from the cart
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  // Increment (+1) or decrement (-1) the quantity of an item
  // Removes the item if quantity would drop to 0
  const updateQuantity = useCallback((productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  // Clear all items from the cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Derived total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Total number of individual items (for badge count)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
