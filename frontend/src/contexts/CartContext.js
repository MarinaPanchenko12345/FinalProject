import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import useCartAPI, { METHOD as CART_METHOD } from "../hooks/useCartAPI";
import { showAlert } from "../helpers/Alert";
import { useSelector } from "react-redux";
import { successToast, errorToast } from "../helpers/AlertToasty";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { apiCart, error, isLoading } = useCartAPI();
  const [cartItems, setCartItems] = useState([]);
  const userId = useSelector((state) => state.token.userId);
  const isLoggedIn = !!userId;

  //Function to get all cart items
  const fetchCartItems = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const response = await apiCart(CART_METHOD.GET_CART);
      setCartItems(response?.items || []);
    } catch (error) {
      errorToast(`Error fetching cart items: ${error}`);
      setCartItems([]);
    }
  }, [apiCart, isLoggedIn]);

  //Function for clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCartItems();
    }
  }, [fetchCartItems, isLoggedIn]);

  //Function for add to cart
  const handleAddToCart = async (card) => {
    if (!isLoggedIn) {
      showAlert("warning", "Please register to purchase");
      return;
    }
    if (card.quantity === 0) {
      showAlert("error", " Sorry ,this item is out of stock.");
      return;
    }
    if (card.user_id.toString() === userId.toString()) {
      showAlert("error", "You cannot buy your own product.");
      return;
    }
    try {
      const cardId = card._id;
      const quantity = 1;

      const cartResponse = await apiCart(CART_METHOD.GET_CART);
      const currentItems = cartResponse?.items || [];
      if (currentItems.some((item) => item.cardId === cardId)) {
        showAlert("warning", "This item is already in your cart.");
      } else {
        await apiCart(CART_METHOD.ADD_TO_CART, {
          cardId,
          quantity,
        });
        fetchCartItems();
        successToast("Item successfully added to your cart!");
      }
    } catch (error) {
      errorToast(`Error adding item to cart: ${error}`);
    }
  };

  //Function for update quantity
  const updateQuantity = async (cardId, newQuantity) => {
    try {
      const payload = { quantity: Number(newQuantity) };
      // Ensure this is a number
      await apiCart(CART_METHOD.UPDATE_QUANTITY, {
        cardId,
        ...payload,
      });
    } catch (error) {
      errorToast(`Error update quantity: ${error}`);
    }
  };

  // Function to increase item quantity
  const increaseQuantity = (cardId) => {
    const card = cartItems.find((item) => item.cardId === cardId);
    if (!card) {
      return;
    }
    const maxQuantity = card.maxQuantity; // Using maxQuantity value from the card
    // Update cart items
    const updatedItems = cartItems.map((item) => {
      if (item.cardId === cardId) {
        // Check: if quantity has reached maxQuantity, don't increase
        if (item.quantity >= maxQuantity) {
          showAlert("warning", `Only ${maxQuantity} items available`);
          return item;
        }
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedItems);

    const newQuantity = updatedItems.find(
      (item) => item.cardId === cardId
    )?.quantity;
    if (newQuantity !== undefined) {
      updateQuantity(cardId, newQuantity);
    }
  };

  // Function to decrease item quantity
  const decreaseQuantity = (cardId) => {
    const updatedItems = cartItems.map((item) => {
      if (item.cardId === cardId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedItems);
    const newQuantity = updatedItems.find(
      (item) => item.cardId === cardId
    )?.quantity;
    if (newQuantity !== undefined) {
      updateQuantity(cardId, newQuantity);
    }
  };

  //Function for remove item from cart
  const removeItemFromCart = async (cardId) => {
    if (!cardId) {
      return;
    }
    try {
      await apiCart(CART_METHOD.REMOVE_FROM_CART, { cardId });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cardId !== cardId)
      );
      fetchCartItems();
    } catch (error) {
      errorToast(`Error remove item: ${error}`);
    }
  };

  //Function for subtotal item
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal;

  return (
    <CartContext.Provider
      value={{
        fetchCartItems,
        cartItems,
        cartItemsLength: cartItems.length,
        clearCart,
        handleAddToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItemFromCart,
        subtotal,
        total,
        isLoading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
