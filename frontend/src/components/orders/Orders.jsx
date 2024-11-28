import React, { useContext, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useOrder } from "../../contexts/OrderContext";
import Loading from "../../helpers/loading/Loading"
import { SearchContext } from "../../contexts/SearchContext";
import { searchOrders } from "../../helpers/SearchBox";
import { useTheme } from "@mui/material/styles";

const Orders = () => {
  const { orderItems, error, isLoading, fetchOrders, getStatus } = useOrder();
  const { searchText } = useContext(SearchContext);
  const theme = useTheme();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const searchedOrders = searchOrders(orderItems, searchText);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div className='message message_error'>Error: {error}</div>;
  }

  return (
    <Box sx={{ color: theme.palette.text.primary }}>
      <h1>My Orders</h1>
      {!orderItems || orderItems.every((order) => order.items.length === 0) ? (
        <div className='message message_empty'>You have no orders</div>
      ) : searchedOrders.length === 0 ? (
        <div className='message message_empty'>No result found</div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, backgroundColor: theme.palette.primary.main }}
        >
          <Table aria-label='orders table'>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedOrders.map((order) =>
                order.items.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <img
                        src={item.image.url}
                        alt={item.image.alt}
                        style={{ width: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}$</TableCell>
                    <TableCell>
                      {(item.quantity * item.price).toFixed(2)}$
                    </TableCell>
                    <TableCell>{getStatus(item)}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Orders;
