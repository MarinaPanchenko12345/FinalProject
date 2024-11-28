import mongoose, { Schema } from "mongoose";
import { generateBizNumber } from "../service/bizNumberGenerator.mjs";

// Schema for Image
const Image = new Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: "card image",
  },
});
// Main Schema for Card
const cardSchema = new Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  image: Image,
  color: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, min: 1 },
  model: { type: String, required: true },
  category: { type: String, required: true },
  company: { type: String, required: true },
  bizNumber: { type: Number, unique: true },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Middleware to generate a unique bizNumber before validation
cardSchema.pre("validate", async function (next) {
  if (!this.bizNumber) {
    this.bizNumber = await generateBizNumber();
  }
  next();
});

export const Card = mongoose.model("cards", cardSchema);


