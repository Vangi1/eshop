import { Request, Response } from "express";
import { Product } from "./models";
import { Order } from "./models";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Chyba pri načítaní produktov" });
  }
};

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, products } = req.body;

    // Overenie dostupnosti produktov
    for (const item of products) {
      const product = await Product.findById(item.productId);

      // Ak produkt neexistuje alebo nemá dostatok skladových zásob
      if (
        !product ||
        typeof product.stock !== "number" ||
        product.stock < item.quantity
      ) {
        res.status(400).json({
          error: `❌ Produkt ${
            product?.name || "neznámy"
          } už nie je na sklade!`,
        });
        return;
      }
    }

    // Zníženie skladovej zásoby
    for (const item of products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Vytvorenie objednávky
    const order = new Order({ email, products });
    await order.save();

    res
      .status(201)
      .json({ message: "✅ Objednávka vytvorená a sklad aktualizovaný" });
  } catch (error) {
    res.status(500).json({ error: "❌ Chyba pri vytváraní objednávky" });
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).populate("products.productId");

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "❌ Chyba pri načítaní objednávok" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().populate("products.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "❌ Chyba pri načítaní objednávok" });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    // Nájdeme objednávku pred zmazaním
    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ error: "❌ Objednávka nenájdená" });
      return;
    }

    // Vrátime produkty späť do skladu
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: item.quantity },
      });
    }

    // Zmažeme objednávku
    await Order.findByIdAndDelete(id);
    res.json({ message: "✅ Objednávka bola úspešne zmazaná" });
  } catch (error) {
    res.status(500).json({ error: "❌ Chyba pri mazaní objednávky" });
  }
};
