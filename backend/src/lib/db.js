import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Double-check this matches your .env key exactly
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env or not loaded properly.");
    }

    mongoose.set("strictQuery", false); // Optional: avoids warnings

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit if DB fails to connect
  }
};
