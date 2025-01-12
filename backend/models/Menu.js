import mongoose from "mongoose";
const { Schema } = mongoose;

const MenuSchema = new Schema({
  name: {
    type: String ,
    required: true,
    trim: true,
  },
  ImageUrl: {
    type: String,
    default: "https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif"
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  price: {
    type: Number ,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ['Appetizers', 'Main Course', 'Desserts'], // Restricts to specific categories
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Menu = mongoose.model('Menu', MenuSchema);
export default Menu;
