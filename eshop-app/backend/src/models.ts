import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  stock: Number,
});

const orderSchema = new mongoose.Schema({
  email: String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model("Product", productSchema);
export const Order = mongoose.model("Order", orderSchema);
