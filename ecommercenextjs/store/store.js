import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

export function makeStore(preloadedState = undefined) {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState,
  });
}
