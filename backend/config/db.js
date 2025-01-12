import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://saudsayyed59:EldzVaO5PVfvcdeM@food-dilevery-app.kto8i.mongodb.net/?retryWrites=true&w=majority&appName=food-dilevery-app");
    console.log('MongoDB connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;