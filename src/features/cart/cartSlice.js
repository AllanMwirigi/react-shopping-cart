import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from '../../cartItems';

const initialState = {
  cartItems: [], // cartItems
  amount: 4,
  total: 0,
  isLoading: true,
}

const url = 'https://course-api.com/react-useReducer-cart-project56';

export const getCartItems = createAsyncThunk('cart/getCartItems', async (data, thunkAPI) => {
  try {
    // thunkAPI.getState() gives full state in store i.e cart and modal
    // thunkAPI.dispatch() can run an action from any feature i.e. modal
    const res = await axios(url);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
//   return fetch(url).then((res) => res.json()).catch((err) => console.log(err));
// });

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
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.cartItems = action.payload;
      state.isLoading = false;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    }
  }
})

export const { clearCart, removeItem, increase, decrease, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;