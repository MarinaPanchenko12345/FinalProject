import express from "express";
import { getUser, guard } from "../../../middlewares/guard.mjs";
import { handleError } from "../../../utils/handleErrors.mjs";
import {
  createOrderFromCart,
  getUserOrders,
} from "../service/orderService.mjs";

const router = express.Router();

// Route for creating an order from the cart
router.post("/add-order", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const order = await createOrderFromCart(user._id);
    res.status(201).send(order);
  } catch (error) {
    console.error("Error creating order:", error);
    handleError(
      res,
      error.status || 500,
      error.message || "An error occurred while creating the order."
    );
  }
});

// Route for retrieving the user's orders
router.get("/my-orders", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const orders = await getUserOrders(user._id);
    res.status(200).send(orders);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

export default router;
