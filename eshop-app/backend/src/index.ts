import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import initDB from "./initDB";

dotenv.config();
const app = express();

// 🔥 Povolenie CORS pre frontend bežiaci na porte 5173
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware na spracovanie JSON requestov
app.use(express.json());

// Swagger dokumentácia
const swaggerDocument = yaml.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routy
app.use("/api", routes);

// Pripojenie k MongoDB a inicializácia databázy
const MONGO_URI = process.env.MONGO_URI || "mongodb://mongo:27017/eshop";

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅ Pripojené k MongoDB");

    // Inicializácia databázy (reset produktov)
    await initDB();

    // Spustenie servera až po pripojení k databáze
    app.listen(5000, () => console.log("🚀 Server beží na porte 5000"));
  })
  .catch((err) => console.error("❌ Chyba pripojenia k MongoDB:", err));
