import { Cart } from "../model/cartMongoose.mjs";
import { Card } from "../../cards/model/cardMongoose.mjs";
import { createCartItem } from "../model/cartModel.mjs";

// Service for adding an item to the cart
export const addItemToCart = async (userId, cardId) => {
  const card = await Card.findById(cardId);
  if (!card) {
    throw { status: 404, message: "Card not found" };
  }
  if (card.user_id.toString() === userId.toString()) {
    throw {
      status: 403,
      message: "You cannot add your own product to the cart",
    };
  }
  let cart =
    (await Cart.findOne({ user_id: userId })) ||
    new Cart({ user_id: userId, items: [] });
  if (cart.items.some((item) => item.cardId.equals(cardId))) {
    throw { status: 400, message: "This item is already in the cart" };
  }
  const cartItem = createCartItem(card, 1);
  cart.items.push(cartItem);
  await cart.save();

  return cartItem;
};

// Service for retrieving the user's cart
export const getUserCart = async (userId) => {
  let cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    cart = new Cart({ user_id: userId, items: [] });
    await cart.save();
  }
  return cart;
};

// Service for updating item quantity in the cart
export const updateCartItemQuantity = async (userId, cardId, quantity) => {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    throw { status: 404, message: "Cart not found" };
  }
  const item = cart.items.find((item) => item.cardId.equals(cardId));
  if (!item) {
    throw { status: 404, message: "Item not found in cart" };
  }
  const card = await Card.findById(cardId);
  if (!card) {
    throw { status: 404, message: "Card not found" };
  }
  if (quantity > card.quantity) {
    throw {
      status: 400,
      message: `Only ${card.quantity} items available for this product.`,
    };
  }
  item.quantity = quantity;
  await cart.save();
  return item;
};

// Service for removing an item from the cart
export const removeItemFromCart = async (userId, cardId) => {
  const cart = await Cart.findOne({ user_id: userId });
  if (!cart) {
    throw { status: 404, message: "Cart not found" };
  }
  cart.items = cart.items.filter((item) => !item.cardId.equals(cardId));
  await cart.save();
  return cart;
};
