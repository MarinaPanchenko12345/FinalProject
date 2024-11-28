import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
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
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  isPending: { type: Boolean, default: true },
  isSent: { type: Boolean, default: false },
  isDelivered: { type: Boolean, default: false },
});

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [orderItemSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
