import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoURI);

    console.log(`MongoDB connected successfully!`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    if (process.env.NODE_ENV === "production") {
      process.exit(1); // Exit in production
    }
  }
};

export default connectDB;