import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useOrder } from "../../contexts/OrderContext";
import { useCart } from "../../contexts/CartContext";
import { useTheme } from "@mui/material/styles";

const PlaceOrder = () => {
  const { subtotal, total } = useCart();
  const { handleAddOrder } = useOrder();
  const theme = useTheme();

  return (
    <Box sx={{ mt: 2 }}>
      <TableContainer component={Paper} sx={{ maxWidth: 400 }}>
        <Table style={{ backgroundColor: theme.palette.primary.main }}>
          <TableBody>
            {/* Subtotal Row */}
            <TableRow>
              <TableCell>
                <Typography variant='h4' component='h1' gutterBottom>
                  Checkout
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant='body1'>Subtotal</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='body1'>${subtotal.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
            {/* Shipping Fee Row */}
            <TableRow>
              <TableCell>
                <Typography variant='body1'>Shipping Fee</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='body1'>{0}</Typography>
              </TableCell>
            </TableRow>
            {/* Total Row */}
            <TableRow>
              <TableCell>
                <Typography variant='h6' fontWeight='bold'>
                  Total
                </Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography variant='h6' fontWeight='bold'>
                  ${total.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>
                <Button
                  variant='contained'
                  size='large'
                  onClick={handleAddOrder}
                  style={{
                    width: "100%",
                    fontWeight: "bold",
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.text.primary,
                  }}
                >
                  Buy It Now
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlaceOrder;
