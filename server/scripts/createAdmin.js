import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import User from "../models/User.js";

await mongoose.connect(process.env.MONGO_URI);

const existingAdmin = await User.findOne({
  role: "admin",
});

if (existingAdmin) {
  console.log("Admin already exists");
  process.exit();
}

await User.create({
  name: "Kashish Admin",
  email: "kashishagrapiz2@gmail.com",
  password: "Admin@123",
  role: "admin",
});

console.log("Admin created successfully");

process.exit();
