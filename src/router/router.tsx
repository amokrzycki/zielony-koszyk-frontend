import { createBrowserRouter } from "react-router-dom";
import Homepage from "../components/Homepage.tsx";
import Products from "../components/Products.tsx";
import About from "../components/About.tsx";
import Contact from "../components/Contact.tsx";
import Category from "../components/Category.tsx";
import Cart from "../components/Cart/Cart.tsx";
import OrderDetails from "../components/Order/OrderDetails.tsx";
import CartLogin from "../components/Cart/CartLogin.tsx";
import OrderSummary from "../components/Order/OrderSummary.tsx";
import OrderConfirm from "../components/Order/OrderConfirm.tsx";
import Login from "../components/Accounts/Login.tsx";
import AccountView from "../components/Accounts/AccountView.tsx";
import AccountOrdersView from "../components/Accounts/AccountOrdersView.tsx";
import AddressBook from "../components/Accounts/Address/AddressBook.tsx";
import AccountOptions from "../components/Accounts/AccountOptions.tsx";
import PasswordChange from "../components/Accounts/PasswordChange.tsx";
import EmailChange from "../components/Accounts/EmailChange.tsx";
import Page from "../components/Page.tsx";
import ChangeAddresses from "../components/Accounts/Address/ChangeAddresses.tsx";
import AccountOrderDetails from "../components/Accounts/AccountOrderDetails.tsx";

const router = createBrowserRouter([
  {
    path: "/*",
    element: <Page />,
    children: [
      {
        path: "*",
        element: <Homepage />,
      },
      {
        path: "produkty",
        element: <Products />,
      },
      {
        path: "o-nas",
        element: <About />,
      },
      {
        path: "kontakt",
        element: <Contact />,
      },
      {
        path: "koszyk",
        element: <Cart />,
      },
      {
        path: "kategoria/:categoryId",
        element: <Category />,
        children: [
          {
            path: ":productId",
            element: <h1>Product</h1>,
          },
        ],
      },
      {
        path: "zamowienie",
        element: <OrderDetails />,
      },
      {
        path: "zamowienie/podsumowanie",
        element: <OrderSummary />,
      },
      {
        path: "zamowienie/potwierdzenie",
        element: <OrderConfirm />,
      },
      {
        path: "cart-login",
        element: <CartLogin />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "konto/*",
        element: <AccountView />,
        children: [
          {
            path: "*",
            element: <AccountOptions />,
          },
          {
            path: "ksiazka-adresowa/*",
            children: [
              {
                path: "*",
                element: <AddressBook />,
              },
              {
                path: "edytuj-dane",
                element: <ChangeAddresses />,
              },
            ],
          },
          {
            path: "zamowienia/*",
            children: [
              {
                path: "*",
                element: <AccountOrdersView />,
              },
              {
                path: ":orderId",
                element: <AccountOrderDetails />,
              },
            ],
          },
          {
            path: "zmiana-email",
            element: <EmailChange />,
          },
          {
            path: "zmiana-hasla",
            element: <PasswordChange />,
          },
        ],
      },
    ],
  },
]);

export default router;
