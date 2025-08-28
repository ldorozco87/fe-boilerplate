'use client';

import { createContext, useContext } from 'react';
import { CartContextType } from '@/types/ecommerce';
import { useCartStore } from '@/stores/cartStore';

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Legacy useCart hook - now uses Zustand as backend
 *
 * @deprecated Consider using useCartStore directly for new components
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

/**
 * Legacy useCartState hook - now uses Zustand as backend
 *
 * @deprecated Consider using useCartStore directly for new components
 */
export const useCartState = (): CartContextType => {
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };
};

export { CartContext };
