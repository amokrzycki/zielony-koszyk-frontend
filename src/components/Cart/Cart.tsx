import { useDispatch } from "react-redux";
import { RootState } from "../../store/store.ts";
import { changeQuantity, removeItem } from "./cartSlice.ts";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import CartItem from "../../types/CartItem.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks.ts";
import { AccountState } from "../../reducers/accountReducers.ts";

function Cart() {
  const navigate = useNavigate();
  const cart = useAppSelector((state: RootState) => state.cart.items);
  const auth = useAppSelector((state: RootState): AccountState => state.auth);
  const dispatch = useDispatch();

  const handleOrder = () => {
    if (auth.token) {
      navigate("/zamowienie");
    } else {
      navigate("/cart-login");
    }
  };

  return (
    <Box id="main-wrapper" className={"flex flex-col items-center"}>
      <Box
        className="main-container"
        sx={{
          bgcolor: "background.paper",
        }}
      >
        <Box className={"main-container"}>
          <Typography
            variant="h4"
            gutterBottom
            className={cart.length === 0 ? "text-center" : ""}
          >
            {cart.length === 0 ? "Twój koszyk jest pusty" : "Twój koszyk"}
          </Typography>
          {cart.length > 0 && (
            <>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="cart-table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Produkt</TableCell>
                      <TableCell align="left">Ilość</TableCell>
                      <TableCell align="right">Cena</TableCell>
                      <TableCell align="center">Kwota</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((item: CartItem) => (
                      <TableRow key={item.productId}>
                        <TableCell component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell align="left" width="80">
                          <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              dispatch(
                                changeQuantity({
                                  productId: item.productId,
                                  quantity: parseInt(e.target.value),
                                }),
                              )
                            }
                            inputProps={{ min: 1 }}
                            size={"small"}
                            sx={{ width: 80 }}
                          />
                        </TableCell>
                        <TableCell align="right">{item.price}zł</TableCell>
                        <TableCell align="center">
                          {item.quantity * item.price}zł
                        </TableCell>
                        <TableCell align="right" width="50">
                          <Button
                            onClick={() => dispatch(removeItem(item.productId))}
                            startIcon={
                              <DeleteIcon
                                sx={{
                                  color: "text.primary",
                                }}
                              />
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box id="summary-wrapper" className={"flex justify-end"}>
                <Box
                  className={"flex flex-col items-center mt-8 rounded-2xl p-8"}
                  sx={{
                    bgcolor: "background.default",
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Suma:{" "}
                    {cart.reduce(
                      (acc: number, item: CartItem) =>
                        acc + item.quantity * item.price,
                      0,
                    )}{" "}
                    zł
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Dostawa: 10 zł
                  </Typography>
                  <Divider />
                  <Typography variant="h6" gutterBottom>
                    Razem:{" "}
                    {cart.reduce(
                      (acc: number, item: CartItem) =>
                        acc + item.quantity * item.price,
                      0,
                    ) + 10}{" "}
                    zł
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrder}
                  >
                    Wybierz dostawę i płatność
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
