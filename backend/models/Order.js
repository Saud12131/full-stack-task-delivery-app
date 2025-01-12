import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        menuItemId: { type: Schema.Types.ObjectId, ref: "Menu", required: true }, 
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true, 
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"], 
      default: "Pending", 
    },
  },
  { timestamps: true } 
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
