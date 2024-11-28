// models/Cart.js
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  cardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    required: true,
  },
  title: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    alt: { type: String, required: true },
  },
  color: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true },
  maxQuantity: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

export const Cart = mongoose.model("Cart", cartSchema);
