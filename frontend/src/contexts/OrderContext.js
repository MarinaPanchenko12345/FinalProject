import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import useOrderAPI, { METHOD as ORDER_METHOD } from "../hooks/useOrderAPI";
import { showAlert } from "../helpers/Alert";
import { useCart } from "./CartContext";
import { useSelector } from "react-redux";
import { errorToast } from "../helpers/AlertToasty";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const userId = useSelector((state) => state.token.userId);
  const isLoggedIn = !!userId;
  const { apiOrder, error, isLoading } = useOrderAPI();
  const [orderItems, setOrderItems] = useState([]);
  const { clearCart } = useCart();

  //Function to get orders
  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const response = await apiOrder(ORDER_METHOD.GET_ORDERS);
      setOrderItems(response || []);
    } catch (error) {
      errorToast(`Error fetching orders: ${error}`);
      setOrderItems([]);
    }
  }, [apiOrder, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [fetchOrders, isLoggedIn]);

  //Function for add order
  const handleAddOrder = async () => {
    try {
      await apiOrder(ORDER_METHOD.ADD_ORDER);
      showAlert("success", "Order placed successfully!");
      clearCart();
      fetchOrders();
    } catch (error) {
      errorToast(`Error add order: ${error}`);
    }
  };

  //Function for get status order
  const getStatus = (item) => {
    if (item.isDelivered) return "Delivered";
    if (item.isSent) return "Sent";
    if (item.isPending) return "Pending";
    return "Unknown";
  };

  //Function for get Items
  const getTotalItemsCount = () => {
    return orderItems.reduce((total, order) => {
      return total + (order.items?.length || 0);
    }, 0);
  };
  const totalItems = getTotalItemsCount();

  const getTotalPrice = () => {
    return orderItems.reduce((total, order) => {
      return (
        total +
        order.items.reduce((sum, item) => sum + item.quantity * item.price, 0)
      );
    }, 0);
  };
  const totalPrice = getTotalPrice();

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        isLoading,
        error,
        fetchOrders,
        handleAddOrder,
        getStatus,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
