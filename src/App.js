import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./components/store/CartProvider";
function App() {
  const [cardIsShown, isCardIsShown] = useState(false);
  const showCard = () => {
    isCardIsShown(true)
  };
  const hideCard = () => {
    isCardIsShown(false);
  };
  return (
    <CartProvider>
      {cardIsShown && <Cart onClose={hideCard} />}
      <Header showCard={showCard} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
