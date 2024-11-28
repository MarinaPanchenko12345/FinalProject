import { Order } from "../model/orderMongoose.mjs";
import { Cart } from "../../cart/model/cartMongoose.mjs";
import { createOrderItem } from "../model/orderModel.mjs";
import { Card } from "../../cards/model/cardMongoose.mjs";

// Service for creating an order from the user's cart
export const createOrderFromCart = async (userId) => {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart || cart.items.length === 0) {
    throw { status: 400, message: "Cart is empty" };
  }
  const orderItems = cart.items.map(createOrderItem);
  const order = new Order({
    user_id: userId,
    items: orderItems,
  });
  await order.save();
  // Update item quantities in the cards
  await Promise.all(
    cart.items.map(async (item) => {
      const card = await Card.findById(item.cardId);
      if (card) {
        card.quantity -= item.quantity;
        if (card.quantity < 0) card.quantity = 0;
        await card.save();
      }
    })
  );
  // Clear the cart after creating the order
  cart.items = [];
  await cart.save();

  return order;
};

// Service for retrieving all orders of a user
export const getUserOrders = async (userId) => {
  const orders = await Order.find({ user_id: userId }).sort({ createdAt: -1 });
  return orders;
};

