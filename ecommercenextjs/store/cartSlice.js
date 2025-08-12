import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
  count: 0,
};

const computeTotals = (items) => {
  let total = 0;
  let count = 0;
  for (const i of items) {
    const q = Number(i.quantity || 1);
    total += Number(i.price || 0) * q;
    count += q;
  }
  return { total, count };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      const t = computeTotals(state.items);
      state.total = t.total;
      state.count = t.count;
    },
    addItem(state, action) {
      const item = action.payload;
      const idx = state.items.findIndex(i => i.id === item.id);
      if (idx >= 0) {
        state.items[idx].quantity = (Number(state.items[idx].quantity) || 1) + (Number(item.quantity) || 1);
      } else {
        state.items.push({...item, quantity: Number(item.quantity) || 1});
      }
      const t = computeTotals(state.items);
      state.total = t.total;
      state.count = t.count;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const idx = state.items.findIndex(i => i.id === id);
      if (idx >= 0) {
        state.items[idx].quantity = Number(quantity);
      }
      const t = computeTotals(state.items);
      state.total = t.total;
      state.count = t.count;
    },
    removeItem(state, action) {
      const id = action.payload;
      state.items = state.items.filter(i => i.id !== id);
      const t = computeTotals(state.items);
      state.total = t.total;
      state.count = t.count;
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
      state.count = 0;
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
