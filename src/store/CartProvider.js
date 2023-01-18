import React, { useReducer } from "react";
import CartContext from "./cart-context";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state = initialState, action) => {
  console.log(action);
  if (action.type === "ADD") {
    console.log(action.payload);
    let updatedCartItems;

    let existingPdIndex = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    let existingProduct = state.items[existingPdIndex];

    if (existingProduct) {
      let updatedItem = {
        ...existingProduct,
        quantity: existingProduct.quantity + action.payload.quantity,
      };
      updatedCartItems = [...state.items];
      updatedCartItems[existingPdIndex] = updatedItem;
    } else {
      updatedCartItems = state.items.concat(action.payload);
    }
    let updatedCartAmounts =
      state.totalAmount + +action.payload.price * action.payload.quantity;
    console.log(updatedCartAmounts);
    return {
      items: updatedCartItems,
      totalAmount: updatedCartAmounts,
    };
  }
  return state;
};

const CartProvider = (props) => {
  console.log(props);
  const [cartState, dispatchFromCart] = useReducer(cartReducer, initialState);
  console.log(cartState);

  const addCart = (item) => {
    console.log(item);
    dispatchFromCart({
      type: "ADD",
      payload: item,
    });
  };
  const cartContextValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
