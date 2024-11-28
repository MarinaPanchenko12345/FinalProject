import express from "express";
import {
  registerValidation,
  loginValidation,
  passwordValidation,
} from "../validation/authJoi.mjs";
import {
  createNewPassword,
  resetPassword,
  userLogin,
  userRegister,
} from "../service/authService.mjs";
import { generateToken } from "../service/tokenService.mjs";
import { handleBadRequest, handleError } from "../../../utils/handleErrors.mjs";

const router = express.Router();

//*AuthEndPoints*//
//login
router.post("/login", async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const { email, password } = req.body;
    const user = await userLogin(email, password);
    const token = generateToken(user);
    res.send(token);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Reset password
router.post("/reset-password", async (req, res) => {
  try {
    const message = await resetPassword(req.body.email);
    res.send(message);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

// Create new password
router.post("/create-new-password/:token", async (req, res) => {
  const { password } = req.body;
  const { token } = req.params; 
  try {
    const { error } = passwordValidation.validate(password);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const message = await createNewPassword(token, password);
    res.send(message);
  } catch (error) {
    res.status(error.status || 500).send(error.message);
  }
});

//Register
router.post("/", async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const newUser = await userRegister(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

export default router;
