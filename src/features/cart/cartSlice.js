import { createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // with this, the action creator is set up automatically with the same name as the reducer
    clearCart: (state) => { state.cartItems = [] }, // can mutate the state directly since redux toolkit comes with immer library // https://redux-toolkit.js.org/usage/immer-reducers
    // clearCart: (state) => { return initialState } // can also set new state value
    removeItem: (state, action) => {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let count = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        count += item.amount;
        total += item.amount * item.price;
      });
      state.amount = count;
      state.total = total;
    }
  }
})

export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;