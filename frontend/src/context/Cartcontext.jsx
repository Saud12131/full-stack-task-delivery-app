import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.menuItemId === action.payload.menuItemId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.menuItemId === action.payload.menuItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { ...state, items: [...state.items, action.payload] };
      }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.menuItemId !== action.payload) };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ cart: state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
