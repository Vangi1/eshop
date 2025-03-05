import mongoose from "mongoose";
import { Product, Order } from "./models";

const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/eshop";

const initDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Vymazanie aj objednávok pri resete databázy
    await Order.deleteMany({});
    // Vymažeme staré produkty a vložíme nové
    await Product.deleteMany({});
    await Product.insertMany([
      { name: "Nohavice", stock: 7 },
      { name: "Tričko", stock: 10 },
      { name: "Mikina", stock: 3 },
      { name: "Čiapka", stock: 5 },
    ]);

    console.log("✅ Databáza bola inicializovaná");
  } catch (error) {
    console.error("❌ Chyba pri inicializácii databázy:", error);
  }
};

export default initDB;
