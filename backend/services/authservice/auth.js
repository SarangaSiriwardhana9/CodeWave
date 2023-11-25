import bcrypt from "bcrypt";
import User from "../../models/Users/user.js";
import jwt from "jsonwebtoken";
import { createError } from "../../utils/error.js"; // Import your custom error handler

// Function to hash a password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(400, "Invalid email or password."));

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return next(createError(400, "Invalid email or password."));

    const token = jwt.sign({ id: user._id,email: user.email }, process.env.JWT_SECRET);
    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none", // Set SameSite to "none" to allow cross-site requests (for example, between different domains).
        secure: false, // Set secure to true to ensure the cookie is only sent over HTTPS.
      })
      .status(200)
      .json({ ...others });
  } catch (err) {
    next(err);
  }
};

export const register = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // Email already exists, return an error response
      return next(createError(400, "Email already exists"));
    }

    const hashedPassword = await hashPassword(req.body.password);
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || "user",
      contactNumber: req.body.contactNumber,
      profilePicture: req.body.profilePicture,
    };

    const result = await User.create(newUser);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
