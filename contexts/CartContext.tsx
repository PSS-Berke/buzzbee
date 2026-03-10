'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export interface CartItem {
  id: string;
  productId: string;
  productSlug: string;
  productName: string;
  productType: string;
  size: string;
  sizeDimensions: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'HYDRATE'; payload: CartItem[] };

interface CartContextValue {
  state: CartState;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  toggleCartDrawer: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  itemCount: number;
  subtotal: number;
  savings: number;
}

// Generate unique cart item ID
const generateCartItemId = (productId: string, size: string): string => {
  return `${productId}-${size.toLowerCase().replace(/\s/g, '-')}`;
};

// Reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const id = generateCartItemId(
        action.payload.productId,
        action.payload.size
      );

      // Check if item already exists
      const existingIndex = state.items.findIndex((item) => item.id === id);

      if (existingIndex > -1) {
        // Item exists - for mattresses, we don't increase quantity, just return current state
        return state;
      }

      // Add new item
      const newItem: CartItem = {
        ...action.payload,
        id,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isOpen: !state.isOpen,
      };

    case 'OPEN_DRAWER':
      return {
        ...state,
        isOpen: true,
      };

    case 'CLOSE_DRAWER':
      return {
        ...state,
        isOpen: false,
      };

    case 'HYDRATE':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}

// Initial state
const initialState: CartState = {
  items: [],
  isOpen: false,
};

// Context
const CartContext = createContext<CartContextValue | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('sleep6-cart');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        dispatch({ type: 'HYDRATE', payload: items });
      } catch (e) {
        console.error('Failed to parse cart from localStorage:', e);
      }
    }
  }, []);

  // Persist to localStorage on changes
  useEffect(() => {
    localStorage.setItem('sleep6-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Actions
  const addItem = (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCartDrawer = () => {
    dispatch({ type: 'TOGGLE_DRAWER' });
  };

  const openCartDrawer = () => {
    dispatch({ type: 'OPEN_DRAWER' });
  };

  const closeCartDrawer = () => {
    dispatch({ type: 'CLOSE_DRAWER' });
  };

  // Computed values
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = state.items.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  const value: CartContextValue = {
    state,
    addItem,
    removeItem,
    clearCart,
    toggleCartDrawer,
    openCartDrawer,
    closeCartDrawer,
    itemCount,
    subtotal,
    savings,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
