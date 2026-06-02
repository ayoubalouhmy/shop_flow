import { createContext, useContext, useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated) {
        setCartItems([]);
        setLoading(false);
        return;
    }
    try {
      setLoading(true);
      const res = await cartAPI.getCart();
      setCartItems(res.data.data.items || []);
    } catch (error) {
      console.error("Error fetching cart in context:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const clearCart = async () => {
    try {
      await cartAPI.clear();
    } catch (error) {
      console.error("Error clearing cart:", error);
    } finally {
      setCartItems([]);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, fetchCart, clearCart, loading, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
