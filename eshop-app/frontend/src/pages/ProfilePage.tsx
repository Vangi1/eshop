import { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  CircularProgress,
  Paper,
} from "@mui/material";

interface Order {
  _id: string;
  products: { productId: { name: string }; quantity: number }[];
  createdAt: string;
}

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    if (!email) {
      alert("Zadaj e-mail");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${email}`
      );
      if (response.data.length === 0) {
        setError("❌ Žiadne objednávky pre tento e-mail");
      }
      setOrders(response.data);
    } catch (error) {
      setError("❌ Chyba pri načítaní objednávok");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        📜 Moje objednávky
      </Typography>

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
        onClick={fetchOrders}
      >
        Načítať objednávky
      </Button>

      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}
      {error && <Typography color="error">{error}</Typography>}

      {orders.length > 0 && (
        <List>
          {orders.map((order) => (
            <Paper key={order._id} sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="h6">
                Objednávka z {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <List>
                {order.products.map((p, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${p.productId?.name ?? "Neznámy produkt"} - ${
                        p.quantity
                      } ks`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          ))}
        </List>
      )}
    </Container>
  );
};

export default ProfilePage;
