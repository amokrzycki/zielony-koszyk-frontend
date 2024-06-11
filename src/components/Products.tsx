import { useEffect, useState } from "react";
import { getProducts } from "../api.ts";
import Product from "../types/Product.ts";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (e) {
        setError(
          "Wystąpił błąd podczas pobierania produktów. Spróbuj ponownie później.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts().then(() => {
      console.log("Products fetched");
    });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography variant="h5" component="h2">
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        padding: 2,
      }}
      id="main-wrapper"
    >
      {products.map((product) => (
        <Card key={product.product_id}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {product.description}
            </Typography>
            <Typography variant="body1" component="p">
              Cena: {product.price} zł
            </Typography>
            <Typography variant="body1" component="p">
              Stan: {product.stock_quantity}
            </Typography>
            <Box>
              <Button>Dodaj do koszyka</Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Products;
