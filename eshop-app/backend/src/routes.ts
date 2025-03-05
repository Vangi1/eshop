import express from "express";
import {
  getProducts,
  createOrder,
  getOrdersByEmail,
  getAllOrders,
  deleteOrder,
} from "./controllers";

const router = express.Router();

// API Endpointy
router.get("/products", getProducts);
router.get("/orders", getAllOrders);
router.post("/orders", createOrder);
router.get("/orders/:email", getOrdersByEmail);
router.delete("/orders/:id", deleteOrder);

export default router; // ✅ Dôležité správne exportovanie
