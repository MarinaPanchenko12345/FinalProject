import Joi from "joi";

const validColors = [
  "red",
  "green",
  "blue",
  "black",
  "white",
  "yellow",
  "orange",
  "purple",
  "pink",
  "metallic",
];
const validCategories = [
  "phones",
  "computers",
  "laptops",
  "monitors",
  "keyboards",
  "computer Mice",
  "headphones",
  "smartwatches",
];

// Validation schema for card
export const CardValidation = Joi.object({
  title: Joi.string().min(2).max(200).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 2 characters long",
    "string.max": "Title must be at most 200 characters long",
    "any.required": "Title is required",
  }),
  subtitle: Joi.string().min(2).max(200).required().messages({
    "string.base": "Subtitle must be a string",
    "string.empty": "Subtitle cannot be empty",
    "string.min": "Subtitle must be at least 2 characters long",
    "string.max": "Subtitle must be at most 200 characters long",
    "any.required": "Subtitle is required",
  }),
  description: Joi.string().min(2).max(1200).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 2 characters long",
    "string.max": "Description must be at most 200 characters long",
    "any.required": "Description is required",
  }),
  image: Joi.object({
    url: Joi.string().uri().min(14).max(200).required().messages({
      "string.uri": "Image URL must be a standard URL",
      "string.min": "Image URL must be at least 14 characters long",
      "string.max": "Image URL must be at most 200 characters long",
      "any.required": "Image URL is required",
    }),
    alt: Joi.string().min(2).max(200).allow("", null).messages({
      "string.base": "Image alt must be a string",
      "string.empty": "Image alt cannot be empty",
      "string.min": "Image alt must be at least 2 characters long",
      "string.max": "Image alt must be at most 200 characters long",
      "any.required": "Image alt is required",
    }),
  }),

  color: Joi.string()
    .valid(...validColors)
    .required()
    .messages({
      "string.base": "Color must be a string",
      "any.only":
        "Color must be one of the following: " + validColors.join(", "),
      "any.required": "Color is required",
    }),
  quantity: Joi.number()
    .integer()
    .positive()
    .min(0)
    .max(999999)
    .required()
    .messages({
      "number.base": "Quantity must be a number",
      "number.integer": "Quantity must be an integer",
      "number.min": "Quantity cannot be negative",
      "any.required": "Quantity is required",
    }),
  price: Joi.number().positive().min(1).max(999999).required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  model: Joi.string().min(2).max(200).required().messages({
    "string.base": "Model alt must be a string",
    "string.empty": "Model alt cannot be empty",
    "string.min": "Model alt must be at least 2 characters long",
    "string.max": "Model alt must be at most 200 characters long",
  }),
  category: Joi.string()
    .valid(...validCategories)
    .required()
    .messages({
      "string.base": "Category must be a string",
      "any.only":
        "Category must be one of the following: " + validCategories.join(", "),
      "any.required": "Category is required",
    }),
  company: Joi.string().required().messages({
    "string.base": "Company must be a string",
    "any.required": "Company is required",
  }),
});
