import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  stock: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const submitOrder = async () => {
    if (!email) {
      alert("Zadaj e-mail");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/orders", {
        email,
        products: cart.map((item) => ({
          productId: item._id,
          quantity: 1,
        })),
      });

      alert("✅ Objednávka odoslaná!");
      clearCart();
    } catch (error) {
      alert("❌ Chyba pri odoslaní objednávky");
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🛒 Košík
      </Typography>
      {cart.length === 0 ? (
        <Typography>Košík je prázdny</Typography>
      ) : (
        <List>
          {cart.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      )}

      <TextField
        label="E-mail"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={submitOrder}
      >
        Odoslať objednávku
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={clearCart}
      >
        Vymazať košík
      </Button>
    </Container>
  );
};

export default CartPage;
