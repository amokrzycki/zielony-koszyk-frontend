import { useEffect, useState } from "react";
import { getProducts } from "../api.ts";
import Product from "../types/Product.ts";
import { Box, CircularProgress, Typography } from "@mui/material";
import ProductCard from "./ProductCard.tsx";
import Search from "./Search.tsx";
import { useSearchParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        if (searchQuery) {
          const lowerCaseSearchQuery = searchQuery.toLowerCase();
          setProducts(
            products.filter(
              (product: Product) =>
                product.name.toLowerCase().includes(lowerCaseSearchQuery) ||
                product.description
                  .toLowerCase()
                  .includes(lowerCaseSearchQuery) ||
                product.category.toLowerCase().includes(lowerCaseSearchQuery),
            ),
          );
        } else {
          setProducts(products);
        }
      } catch (e) {
        setError(
          "Wystąpił błąd podczas pobierania produktów. Spróbuj ponownie później.",
        );
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts()
      .then(() => {
        console.log("Products fetched");
      })
      .catch((e) => {
        console.error(e);
      });
  }, [searchQuery]);

  if (loading) {
    return (
      <Box
        id="main-wrapper"
        className={"flex justify-center items-center h-full"}
      >
        <CircularProgress sx={{ color: "primary" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        id="main-wrapper"
        className={"flex justify-center items-center h-full"}
      >
        <Typography variant="h5" component="h2">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="main-wrapper">
      <Box id="search-wrapper" className={"flex justify-center w-full"}>
        <Search />
      </Box>
      <Box className={"flex justify-center flex-wrap gap-2 p-2"}>
        {searchQuery && products.length === 0 ? (
          <Typography variant="h5" component="h2">
            Brak produktów spełniających kryteria wyszukiwania dla frazy: "
            {searchQuery}".
          </Typography>
        ) : (
          products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
      </Box>
    </Box>
  );
}

export default Products;
