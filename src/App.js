import { useContext, useState } from "react";
import "./App.css";
import { dummyData } from "./dummyData";
import CartContext from "./store/cart-context";

function App() {
  const [products, setProducts] = useState(dummyData);
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);

  const cartAmount = cartCtx.items.reduce(
    (curr, item) => curr + item.quantity,
    0
  );

  console.log(cartCtx.totalAmount);

  const cartHandler = (pd) => {
    cartCtx.addCart({
      ...pd,
      quantity: 1,
    });
  };
  return (
    <div className="app">
      <header>
        <nav>
          <ul>
            <li>cart-{cartAmount}</li>
            <li>amount-$ {cartCtx.totalAmount}</li>
          </ul>
        </nav>
      </header>
      {products.map((pd) => {
        return (
          <div key={pd.id}>
            <h1>{pd.name}</h1>
            <h2> {parseInt(pd.price)} </h2>
            <p> {pd.inStock} </p>
            <button onClick={() => cartHandler(pd)}>Add to Cart</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
