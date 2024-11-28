import jwt from "jsonwebtoken";

//Generates a JWT token for the given user.
export const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expiration time (1 hour)
  );
  return token;
};

//Generates a JWT  reset token for the given user.
export const generateResetToken = (user) => {
  const resetToken = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "15m" } 
  );
  return resetToken;
};