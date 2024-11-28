import React, { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import OrderPlace from "../orders/OrderPlace";
import { useCart } from "../../contexts/CartContext";
import { useOrder } from "../../contexts/OrderContext";
import { SearchContext } from "../../contexts/SearchContext";
import { searchCards } from "../../helpers/SearchBox";
import { useTheme } from "@mui/material/styles";

const Cart = () => {
  const {
    cartItems,
    fetchCartItems,
    error,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    subtotal,
    total,
  } = useCart();
  const { handleAddOrder } = useOrder();
  const { searchText } = useContext(SearchContext);
  const searchedCartItems = searchCards(cartItems, searchText);
  const theme = useTheme();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  if (error) {
    return <div className='message message_error'>Error: {error}</div>;
  }
  const noItemsInCart =
    !cartItems || cartItems.length === 0 || searchedCartItems.length === 0;

  return (
    <Box sx={{ mt: 2, p: 2, color: theme.palette.text.primary }}>
      <h1>Cart</h1>
      {noItemsInCart ? (
        <div className='message message_empty'>No items in your cart</div>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{ maxWidth: 1200, backgroundColor: theme.palette.primary.main }}
          >
            <Table aria-label='cart table'>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>In Stock</TableCell>
                  <TableCell sx={{ minWidth: "150px" }}>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchedCartItems.map((item) => (
                  <TableRow key={item.cardId}>
                    <TableCell>
                      <img
                        src={item.image.url}
                        alt={item.image.alt}
                        style={{ width: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.color}</TableCell>
                    <TableCell>{item.price}$</TableCell>
                    <TableCell>{item.maxQuantity}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => decreaseQuantity(item.cardId)}
                        style={{
                          color: theme.palette.text.primary,
                        }}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                      {item.quantity}
                      <IconButton
                        onClick={() => increaseQuantity(item.cardId)}
                        disabled={item.quantity >= item.maxQuantity}
                        style={{
                          color: theme.palette.text.primary,
                        }}
                      >
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {(item.price * item.quantity).toFixed(2)}$
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => removeItemFromCart(item.cardId)}
                        style={{
                          color: theme.palette.text.primary,
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <OrderPlace
            subtotal={subtotal}
            total={total}
            handleBuy={handleAddOrder}
          />
        </>
      )}
    </Box>
  );
};

export default Cart;
