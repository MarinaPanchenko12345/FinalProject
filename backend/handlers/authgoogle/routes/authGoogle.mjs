import express from "express";
import passport from "passport";
import session from "express-session";
import "../service/passportGoogle.mjs";

const router = express.Router();

// Session setup
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Initialize Passport and sessions
router.use(passport.initialize());
router.use(passport.session());

// Route for Google authentication
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// Route for handling the callback after authentication
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    const token = req.user.token; // Полученный токен
    console.log("Generated JWT token:", token);
    res.redirect(`http://localhost:3000/auth-success?token=${token}`);
  }
);

// Route to log out and clear session
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Ошибка при уничтожении сессии:", err);
      return res.status(500).send("Ошибка при выходе");
    }
    res.clearCookie("connect.sid");
    res.status(200).send("Вы успешно вышли из системы");
  });
});


export default router;
