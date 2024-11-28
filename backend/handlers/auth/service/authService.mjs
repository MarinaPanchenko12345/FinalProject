import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/userMongoose.mjs";
import {
  checkLoginAttempt,
  increaseLoginAttempt,
  resetLoginAttempt,
} from "./loginAttemptService.mjs";
import { createUserObject } from "../model/userModel.mjs";
import { generateResetToken } from "./tokenService.mjs";
import { sendEmail } from "./emailService.mjs";

//Service for Login
export const userLogin = async (email, password, res) => {
  const user = await User.findOne({ email, isDeleted: { $ne: true } });
  if (!user) {
    throw { status: 403, message: "Invalid email or password" };
  }
  const { loginAttempt, locked } = await checkLoginAttempt(email); // Check if the account is not locked
  if (locked) {
    throw {
      status: 403,
      message: "Account is locked for 24 hours. Try again later.",
    };
  }
  if (!(await bcrypt.compare(password, user.password))) {
    await increaseLoginAttempt(email);
    throw { status: 403, message: "Invalid email or password" };
  }
  if (loginAttempt) {
    await resetLoginAttempt(email); // If login is successful reset a previous login attempt record
  }
  return user;
};

//Service for reset password
export const resetPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  // Generate token for reset password
  const resetToken = generateResetToken(user);
  const resetLink = `http://localhost:3000/create-new-password/${resetToken}`;
  // Send email to user
  await sendEmail({
    to: email,
    subject: "Password Reset",
    text: `Click the link to reset your password: ${resetLink}`,
  });
  return "Password reset link sent to your email.";
};


//Service for create new password
export const createNewPassword = async (token, password) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);
  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }
  // Hash for update password
  user.password = await bcrypt.hash(password, 10);
  await user.save();
  return "Password has been updated.";
};

//Service for Register
export const userRegister = async (body) => {
  const existingUser = await User.findOne({ email: body.email }).select(
    "+isDeleted"
  );
  if (existingUser) {
    throw {
      status: 403,
      message: "Email already exists. Please choose another email.",
    };
  }
  const user = await createUserObject(body);
  return await user.save();
};

