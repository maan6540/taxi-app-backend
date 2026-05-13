import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("MONGO URI EXISTS:", !!process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

  } catch (error) {

    console.log(error);

  }
};

export default connectDB;