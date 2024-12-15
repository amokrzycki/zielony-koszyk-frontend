import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import User from "../../types/User.ts";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { validateEmail } from "../../utils/validators.ts";
import { useChangeEmailMutation } from "./accountsApiSlice.ts";
import { logoutUser } from "./accountSlice.ts";

export interface IEmailChangeFormValues {
  email: string;
  newEmail: string;
}

function EmailChange() {
  const dispatch = useAppDispatch();
  const user: User = useAppSelector((state) => state.auth.user);
  const [changeEmail] = useChangeEmailMutation();
  const navigate = useNavigate();

  const validateEmailChange = (
    email: string,
    values: IEmailChangeFormValues,
  ) => {
    if (email === user.email && email === values.newEmail) {
      return "Nowy adres email musi się różnić od starego";
    }

    return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? undefined
      : "Podaj prawidłowy adres email";
  };

  const validate = {
    email: validateEmail,
    newEmail: validateEmailChange,
  };

  const form = useForm<IEmailChangeFormValues>({
    initialValues: {
      email: "",
      newEmail: "",
    },
    validate,
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
  });

  const isValid = form.isValid();

  const handleSubmit = (values: IEmailChangeFormValues) => {
    changeEmail({ user_id: user.user_id, email: values.newEmail })
      .then(() => {
        console.log("Email changed");
      })
      .catch((error) => {
        console.error(error);
      });
    // TODO: Redirect to success page
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant={"h4"}>Zmiana adresu email</Typography>
        <TextField
          variant={"outlined"}
          label={"Wpisz aktualny adres email"}
          {...form.getInputProps("email")}
          error={Boolean(form.errors.email) && form.isTouched("email")}
          helperText={form.errors.email}
          sx={{ mt: "1em", width: "300px" }}
        />
        <TextField
          variant={"outlined"}
          label={"Wpisz nowe adres email"}
          {...form.getInputProps("newEmail")}
          error={Boolean(form.errors.newEmail) && form.isTouched("newEmail")}
          helperText={form.errors.newEmail}
          sx={{ mt: "1em", width: "300px" }}
        />
        <Button
          type={"submit"}
          variant={"contained"}
          sx={{ mt: "1em" }}
          disabled={!isValid && form.isTouched()}
        >
          Zmień adres email
        </Button>
      </Box>
    </form>
  );
}

export default EmailChange;
