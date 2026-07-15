import jwt from "jsonwebtoken";
import { COOKIE_OPTIONS } from "./constants.js";

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.cookie("token", token, COOKIE_OPTIONS);

  return token;
};

export default generateToken;
