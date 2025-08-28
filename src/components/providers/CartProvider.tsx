'use client';

import React from 'react';
import { useCartStore } from '@/stores/cartStore';
import { CartContext } from '@/hooks/useCart';

interface CartProviderProps {
  children: React.ReactNode;
}

/**
 * CartProvider - Zustand-based cart provider
 *
 * This provider initializes the cart store and provides backward compatibility.
 * Components can use either useCartStore directly or the legacy useCart hook.
 */
export default function CartProvider({ children }: CartProviderProps) {
  const cartState = useCartStore();

  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  );
}
