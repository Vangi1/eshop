import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Snackbar,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface Product {
  _id: string;
  name: string;
  stock: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Chyba pri načítaní produktov:", error));
  }, []);

  const addToCart = (product: Product) => {
    if (product.stock <= 0) {
      alert("❌ Produkt nie je na sklade!");
      return;
    }

    // Odpočítanie zo skladovej zásoby len vizuálne z DB sa odpíše až po vytvorení objednávky
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === product._id ? { ...p, stock: p.stock - 1 } : p
      )
    );

    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Zobrazenie notifikácie
    setNotification(true);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🛍️ Produkty
      </Typography>

      {/* Ikonka košíka s odznakom */}
      <IconButton color="inherit" sx={{ float: "right" }} href="/cart">
        <Badge badgeContent={cart.length} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </IconButton>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography
                  variant="body2"
                  color={product.stock > 0 ? "textPrimary" : "error"}
                >
                  Skladom: {product.stock} ks
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock > 0 ? "Pridať do košíka" : "Vypredané"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Notifikácia */}
      <Snackbar
        open={notification}
        autoHideDuration={2000}
        onClose={() => setNotification(false)}
        message="✅ Produkt pridaný do košíka!"
      />
    </Container>
  );
};

export default ProductsPage;
