import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
const getLocal = (key) => {
  if (typeof window === "undefined") return null;
  try { return localStorage.getItem(key); } catch { return null; }
};
const setLocal = (key, value) => {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, value); } catch {}
};

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/carts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ total: 0, subTotal: 0, tax: 0, items: [] }),
      });
      if (!response.ok) throw new Error("Erreur lors de la création du panier");
      const result = await response.json();

      setLocal("cartId", result.id);
      setLocal("cart", JSON.stringify(result));
      if (!getLocal("RecentlyViewed")) setLocal("RecentlyViewed", JSON.stringify([]));

      return result.id;
    } catch (err) {
      return rejectWithValue(err.message || "Erreur createCart");
    }
  }
);

export const fetchCartData = createAsyncThunk(
  "cart/fetchCartData",
  async (cartId, { rejectWithValue }) => {
    try {
      const id = cartId || (getLocal("cartId") ? getLocal("cartId") : null);
      if (!id) throw new Error("cartId manquant");

      const response = await fetch(`${API_URL}/carts/${id}`);
      if (!response.ok) throw new Error("Erreur lors du chargement du panier");
      const data = await response.json();

      setLocal("cart", JSON.stringify(data));
      setLocal("cartId", id);

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Erreur fetchCartData");
    }
  }
);

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ cartId, itemId, qty }, { rejectWithValue }) => {
    try {
      if (typeof window === "undefined") throw new Error("Opération côté client uniquement");
      let cart = JSON.parse(getLocal("cart"));
      if (!cart) throw new Error("Panier introuvable");

      const itemToUpdate = cart.items.find((i) => i.id === itemId);
      if (!itemToUpdate) throw new Error("Article non trouvé");

      itemToUpdate.qty = qty;
      cart.total = cart.items.reduce((total, i) => total + (i.price * (1 - (i.discountRate || 0) / 100)) * i.qty, 0);
      cart.subTotal = cart.total;

      setLocal("cart", JSON.stringify(cart));

      const updateResponse = await fetch(`${API_URL}/carts/${cartId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });

      if (!updateResponse.ok) throw new Error("Erreur mise à jour du panier");
      const updated = await updateResponse.json();
      setLocal("cart", JSON.stringify(updated));
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || "Erreur updateItemQuantity");
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ cartId, item }, { rejectWithValue }) => {
    try {
      if (typeof window === "undefined") throw new Error("Opération côté client uniquement");
      let cart = JSON.parse(getLocal("cart"));
      if (!cart) throw new Error("Panier introuvable");

      const existingItem = cart.items.find((i) => i.id === item.id);
      if (existingItem) existingItem.qty += item.qty;
      else cart.items.push(item);

      cart.total = cart.items.reduce((total, i) => total + (i.price * (1 - (i.discountRate || 0) / 100)) * i.qty, 0);
      cart.subTotal = cart.total;
      setLocal("cart", JSON.stringify(cart));

      const updateResponse = await fetch(`${API_URL}/carts/${cartId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });
      if (!updateResponse.ok) throw new Error("Erreur lors de l'ajout au panier");
      const updated = await updateResponse.json();
      setLocal("cart", JSON.stringify(updated));
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || "Erreur addToCart");
    }
  }
);

export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async ({ cartId, itemId }, { rejectWithValue }) => {
    try {
      if (typeof window === "undefined") throw new Error("Opération côté client uniquement");
      let cart = JSON.parse(getLocal("cart"));
      if (!cart) throw new Error("Panier introuvable");

      cart.items = cart.items.filter((item) => item.id !== itemId);
      cart.total = cart.items.reduce((total, item) => total + (item.price * (1 - (item.discountRate || 0) / 100)) * item.qty, 0);
      cart.subTotal = cart.total;
      setLocal("cart", JSON.stringify(cart));

      const updateResponse = await fetch(`${API_URL}/carts/${cartId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cart),
      });
      if (!updateResponse.ok) throw new Error("Erreur suppression article");
      const updated = await updateResponse.json();
      setLocal("cart", JSON.stringify(updated));
      return updated;
    } catch (err) {
      return rejectWithValue(err.message || "Erreur removeItemFromCart");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartId: null,
    cartData: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCartFromLocal(state, action) {
      state.cartId = action.payload?.cartId ?? state.cartId;
      state.cartData = action.payload?.cartData ?? state.cartData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createCart.fulfilled, (state, action) => { state.loading = false; state.cartId = action.payload; })
      .addCase(createCart.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error?.message; })

      .addCase(fetchCartData.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchCartData.fulfilled, (state, action) => { state.loading = false; state.cartData = action.payload; state.error = null; state.cartId = action.payload?.id ?? state.cartId; })
      .addCase(fetchCartData.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error?.message; })

      .addCase(updateItemQuantity.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(updateItemQuantity.fulfilled, (state, action) => { state.loading = false; state.cartData = action.payload; })
      .addCase(updateItemQuantity.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error?.message; })

      .addCase(addToCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addToCart.fulfilled, (state, action) => { state.loading = false; state.cartData = action.payload; })
      .addCase(addToCart.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error?.message; })

      .addCase(removeItemFromCart.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(removeItemFromCart.fulfilled, (state, action) => { state.loading = false; state.cartData = action.payload; })
      .addCase(removeItemFromCart.rejected, (state, action) => { state.loading = false; state.error = action.payload || action.error?.message; });
  },
});

export const { setCartFromLocal } = cartSlice.actions;
export default cartSlice.reducer;
