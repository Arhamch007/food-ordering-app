import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/cart-context";
import CartItems from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, isCheckoutDone] = useState(false);
  const Ctx = useContext(CartContext);

  const TotalAmount = `$${Ctx.totalAmount.toFixed(2)}`;
  const hasItem = Ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    Ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    Ctx.addItem({ ...item, amount: 1 });
  };

  const action = () => {
    isCheckoutDone(true);
  };

  const submitHandler = (userData) => {
    fetch("https://react-https-86f27-default-rtdb.firebaseio.com/orders.json", {
      method: "Post",
      body: JSON.stringify({
        user: userData,
        orderedItems: Ctx.items
      }),

    });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {Ctx.items.map((item) => (
        <li>
          <CartItems
            key={item.id}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        </li>
      ))}
    </ul>
  );
  const buttonAction = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className={classes.button} onClick={action}>
          Order
        </button>
      )}
    </div>
  );

  

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{TotalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout submitData={submitHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && buttonAction}
    </Modal>
  );
};

export default Cart;
