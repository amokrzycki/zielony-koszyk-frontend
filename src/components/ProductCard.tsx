import Product from "../types/Product.ts";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addItem } from "../store/appSlice.ts";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMode } from "../providers/ModeProvider.tsx";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { mode } = useMode();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: product.product_id,
        name: product.name,
        quantity: quantity,
        price: product.price,
      }),
    );
  };

  return (
    <Card>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          width: "300px",
          textAlign: "center",
        }}
      >
        <img src="/images/fruits.jpeg" height="120px" alt="product-image" />
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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="body1" component="p">
            Ilość:
          </Typography>
          <TextField
            type="number"
            inputProps={{ min: "1", max: `${product.stock_quantity}` }}
            defaultValue="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            size={"small"}
            sx={{ width: "70px" }}
          />
        </Box>
        <Box>
          <Button
            onClick={handleAddToCart}
            variant="contained"
            startIcon={
              <ShoppingCartIcon
                sx={mode === "light" ? { color: "#000" } : { color: "#FFF" }}
              />
            }
          >
            Dodaj do koszyka
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
