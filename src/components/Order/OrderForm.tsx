import { useForm } from "@mantine/form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { validate } from "./Order.ts";
import { Order } from "../../types/Order.ts";
import { OrderStatuses } from "../../enums/OrderStatuses.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import CartItem from "../../types/CartItem.ts";
import { setOrder } from "./orderSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks.ts";
import { calculateTotalAmount } from "../Cart/cartSlice.ts";

interface IFormValues {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  street: string;
  buildingNumber: string;
  city: string;
  zip: string;
}

function OrderForm() {
  const cart = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<IFormValues>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      number: "",
      street: "",
      buildingNumber: "",
      city: "",
      zip: "",
    },
    validate,
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
  });

  const isValid = form.isValid();

  const handleSubmit = (values: IFormValues) => {
    const order: Order = {
      customer_name: `${values.firstName} ${values.lastName}`,
      customer_email: values.email,
      customer_phone: values.number,
      customer_address: `${values.street} ${values.buildingNumber}, ${values.zip} ${values.city}`,
      status: OrderStatuses.NEW,
      orderDetails: cart.map((item: CartItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    dispatch(setOrder(order));
    dispatch(calculateTotalAmount());

    navigate("/zamowienie/podsumowanie");
  };

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        handleSubmit(values);
      })}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        <Typography variant="h5">Dane do wysyłki</Typography>
        <Box>
          <TextField
            variant="outlined"
            label="Imię"
            placeholder={"Jan"}
            {...form.getInputProps("firstName")}
            error={
              Boolean(form.errors.firstName) && form.isTouched("firstName")
            }
            helperText={form.errors.firstName}
            sx={{ marginRight: "1em" }}
          />
          <TextField
            variant="outlined"
            label="Nazwisko"
            placeholder={"Kowalski"}
            {...form.getInputProps("lastName")}
            error={Boolean(form.errors.lastName) && form.isTouched("lastName")}
            helperText={form.errors.lastName}
          />
        </Box>
        <TextField
          variant="outlined"
          label="Email"
          placeholder={"twoj.mail@gmail.com"}
          {...form.getInputProps("email")}
          helperText={form.errors.email}
          error={Boolean(form.errors.email) && form.isTouched("email")}
        />
        <TextField
          variant="outlined"
          label="Numer telefonu"
          placeholder={"+48123456789"}
          {...form.getInputProps("number")}
          helperText={form.errors.number}
          error={Boolean(form.errors.number) && form.isTouched("number")}
        />
        <Box>
          <TextField
            variant="outlined"
            label="Ulica"
            placeholder={"ul. Przykładowa"}
            {...form.getInputProps("street")}
            helperText={form.errors.street}
            error={Boolean(form.errors.street) && form.isTouched("street")}
            sx={{ marginRight: "1em" }}
          />
          <TextField
            variant="outlined"
            label="Numer domu/lokalu"
            placeholder={"1A/2"}
            {...form.getInputProps("buildingNumber")}
            helperText={form.errors.buldingNumber}
            error={
              Boolean(form.errors.buildingNumber) &&
              form.isTouched("buildingNumber")
            }
          />
        </Box>
        <Box>
          <TextField
            variant="outlined"
            label="Kod pocztowy"
            placeholder={"00-000"}
            {...form.getInputProps("zip")}
            helperText={form.errors.zip}
            error={Boolean(form.errors.zip) && form.isTouched("zip")}
            sx={{ marginRight: "1em" }}
          />
          <TextField
            variant="outlined"
            label="Miejscowość"
            placeholder={"Warszawa"}
            {...form.getInputProps("city")}
            helperText={form.errors.city}
            error={Boolean(form.errors.city) && form.isTouched("city")}
          />
        </Box>

        <Button type="submit" disabled={!isValid} variant="contained">
          Przejdź dalej
        </Button>
      </Box>
    </form>
  );
}

export default OrderForm;