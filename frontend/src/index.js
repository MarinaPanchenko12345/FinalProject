import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext";
import { SortProvider } from "./contexts/SortContext";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { UserProvider } from "./contexts/UserContext";
import { CardProvider } from "./contexts/CardContext";
import { CardsUserProvider } from "./contexts/CardsUserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CardProvider>
      <CardsUserProvider>
        <CartProvider>
          <OrderProvider>
            <SearchProvider>
              <UserProvider>
                <SortProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </SortProvider>
              </UserProvider>
            </SearchProvider>
          </OrderProvider>
        </CartProvider>
      </CardsUserProvider>
    </CardProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
