import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
} from "../../Order/orderApiSlice.ts";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Loading from "../../common/Loading.tsx";
import {
  DataGrid,
  GridColDef,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Order } from "@/types/Order.ts";
import { useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal.tsx";
import toast from "react-hot-toast";
import { getFormattedDate } from "@/helpers/getFormattedDate.ts";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import ErrorView from "../../common/ErrorView.tsx";
import { OrderType } from "@/enums/OrderType.ts";
import { getPolishStatus } from "@/helpers/getPolishStatus.ts";
import InvoiceDownloadButton from "@/components/Order/InvoiceDownloadButton.tsx";

function OrdersView() {
  const { data: orders, isError, isLoading, refetch } = useGetOrdersQuery();
  const navigate = useNavigate();
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleConfirmDeleteModalOpen = () => setOpenConfirmDeleteModal(true);
  const handleConfirmDeleteModalClose = () => setOpenConfirmDeleteModal(false);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !orders) {
    return <ErrorView message={"Nie udało się pobrać zamówień."} />;
  }

  const onDelete = async () => {
    if (selectedRows.length === 0) {
      toast.error("Nie wybrano zamówień do usunięcia.");
      return;
    }

    try {
      await toast.promise(
        Promise.all(selectedRows.map((id) => deleteOrder(id).unwrap())),
        {
          loading: `Usuwanie ${selectedRows.length >= 1 ? "zamówienia" : "zamówień"}...`,
          success: `${selectedRows.length >= 1 ? "Zamówienie zostało usunięte." : "Zamówienia zostały usunięte."}`,
          error: `Wystąpił błąd podczas usuwania ${selectedRows.length >= 1 ? "zamówienia" : "zamówień"}.`,
        },
      );
      setSelectedRows([]);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Nie udało się usunąć.");
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID zamówienia", width: 130 },
    {
      field: "actions",
      headerName: "Akcje",
      width: 350,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() =>
              navigate(`/admin/zarzadzanie-zamowieniami/${params.id}`)
            }
            sx={{
              mr: 2,
            }}
          >
            Szczegóły
          </Button>
          <InvoiceDownloadButton orderId={parseInt(params.id.toString())} />
        </Box>
      ),
    },
    { field: "user_id", headerName: "ID klienta", width: 200 },
    {
      field: "customer_name",
      headerName: "Imię i nazwisko klienta",
      width: 200,
    },
    {
      field: "customer_email",
      headerName: "Email klienta",
      width: 190,
    },
    {
      field: "customer_phone",
      headerName: "Telefon klienta",
      width: 150,
    },
    {
      field: "customer_address",
      headerName: "Adres klienta",
      width: 350,
    },
    { field: "order_date", headerName: "Data zamówienia", width: 150 },
    {
      field: "total_amount",
      headerName: "Kwota całkowita",
      width: 150,
      sortComparator: (v1, v2) => v1 - v2,
    },
    {
      field: "status",
      headerName: "Status",
      width: 250,
    },
  ];

  const rows = orders?.map((order: Order) => {
    const customer_name =
      order.order_type === OrderType.COMPANY
        ? `${order.billingAddress.company_name || ""}`
        : `${order.billingAddress.first_name || ""} ${order.billingAddress.last_name || ""}`;
    return {
      id: order.order_id,
      user_id: order.user_id || "Zamówienie bez konta",
      customer_name,
      customer_email: order.customer_email,
      customer_phone: order.billingAddress.phone,
      customer_address: `${order.billingAddress.street} ${order.billingAddress.building_number}${order.billingAddress.flat_number ? `/${order.billingAddress.flat_number}` : ""} ${order.billingAddress.zip} ${order.billingAddress.city}`,
      order_date: getFormattedDate(order.order_date.toString()),
      total_amount: `${order.total_amount} zł`,
      status: getPolishStatus(order.status),
    };
  });

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer className={"flex justify-between"}>
        <GridToolbarColumnsButton />
        {selectedRows.length > 0 && (
          <Button color="error" onClick={handleConfirmDeleteModalOpen}>
            Usuń zaznaczone ({selectedRows.length})
          </Button>
        )}
        <GridToolbarQuickFilter debounceMs={300} />
      </GridToolbarContainer>
    );
  };

  return (
    <Box className={"flex flex-col overflow-x-auto w-full"}>
      <Box className={"flex items-center"}>
        <Typography variant="h4" component="h1">
          Zamówienia
        </Typography>
        <IconButton onClick={() => refetch()} color="primary">
          <RefreshIcon />
        </IconButton>
      </Box>
      <Box className={"w-full overflow-x-auto"}>
        <DataGrid
          disableRowSelectionOnClick
          checkboxSelection
          columns={columns}
          rows={rows}
          rowHeight={40}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          sx={{ border: 0 }}
          slots={{ toolbar: CustomToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          onRowSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection as number[])
          }
        />
      </Box>
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        handleClose={handleConfirmDeleteModalClose}
        onConfirm={onDelete}
        count={selectedRows.length}
      />
    </Box>
  );
}

export default OrdersView;
