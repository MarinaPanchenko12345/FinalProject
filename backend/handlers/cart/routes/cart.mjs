import express from "express";
import { getUser, guard } from "../../../middlewares/guard.mjs";
import { handleError } from "../../../utils/handleErrors.mjs";
import {
  addItemToCart,
  getUserCart,
  updateCartItemQuantity,
  removeItemFromCart,
} from "../service/cartService.mjs";

const router = express.Router();

// Route for adding an item to the cart
router.post("/add-to-cart/:cardId", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const cartItem = await addItemToCart(user._id, req.params.cardId);
    res.status(200).send({ message: "Item added to cart", item: cartItem });
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});



// Route for updating item quantity in the cart
router.patch("/update-quantity/:cardId", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const updatedItem = await updateCartItemQuantity(
      user._id,
      req.params.cardId,
      Number(req.body.quantity)
    );
    res.status(200).send({
      message: "Quantity updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

// Route for removing an item from the cart
router.delete("/remove-from-cart/:cardId", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const cart = await removeItemFromCart(user._id, req.params.cardId);
    res.status(200).send({
      message: "Item removed from cart",
      cart: cart,
    });
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

// Route for retrieving the user's cart
router.get("/get-cart", guard, async (req, res) => {
  try {
    const user = getUser(req);
    const cart = await getUserCart(user._id);
    res.status(200).send(cart);
  } catch (error) {
    handleError(res, error.status || 500, error.message);
  }
});

export default router;

