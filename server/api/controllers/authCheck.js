import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, "123");

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      res.json({ error: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401);
    res.json({ error: "Not authorized, no token" });
  }
};
