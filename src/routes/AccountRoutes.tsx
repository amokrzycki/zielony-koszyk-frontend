import { Route } from "./Routes.tsx";
import AccountOptions from "../components/Accounts/AccountOptions.tsx";
import AddressBook from "../components/Accounts/Address/AddressBook.tsx";
import ChangeAddresses from "../components/Accounts/Address/ChangeAddresses.tsx";
import AccountOrdersView from "../components/Accounts/AccountOrdersView.tsx";
import AccountOrderDetails from "../components/Accounts/AccountOrderDetails.tsx";
import EmailChange from "../components/Accounts/EmailChange.tsx";
import PasswordChange from "../components/Accounts/PasswordChange.tsx";

export const AccountRoutes: Route[] = [
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
];
