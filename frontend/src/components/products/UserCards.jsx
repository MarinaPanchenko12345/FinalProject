import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import DeleteIcon from "@mui/icons-material/Delete";
import DrawIcon from "@mui/icons-material/Draw";
import Loading from "../../helpers/loading/Loading.jsx";
import { searchCards } from "../../helpers/SearchBox";
import { SearchContext } from "../../contexts/SearchContext.js";
import CreateProductCard from "./CreateProductCard.jsx";
import UpdateProductCard from "./UpdateProductCard.jsx";
import { useTheme } from "@mui/material/styles";
import { TableRow, TableCell, IconButton } from "@mui/material";
import PaginationTable from "../../helpers/PaginationTable.jsx";
import { useCardsUser } from "../../contexts/CardsUserContext.js";
import { errorToast, successToast } from "../../helpers/AlertToasty.js";

const UserCards = () => {
  const { searchText } = useContext(SearchContext);
  const [currentCard, setCurrentCard] = useState(null);
  const [formMode, setFormMode] = useState("");
  const theme = useTheme();
  const { fetchUserCards, deleteCard, userCards, isLoading, error } =
    useCardsUser();

  const toggleForm = (mode, card = null) => {
    setFormMode(mode);
    setCurrentCard(card);
  };

  const handleCancel = () => {
    setFormMode("");
  };

  const handleNewCardAdded = () => {
    fetchUserCards();
    setFormMode("");
  };

  const handleCardUpdated = () => {
    fetchUserCards();
    setFormMode("");
  };

  const handleDeleteCard = async (card) => {
    try {
      await deleteCard(card._id);
      successToast("Card deleted successfully!");
    } catch (error) {
      errorToast("Failed to delete card.");
    }
  };

  useEffect(() => {
    fetchUserCards();
  }, [fetchUserCards]);

  const searchedCards = searchCards(userCards, searchText);
  const criticalQuantity = searchedCards.some((card) => card.quantity < 3);

  if (isLoading) return <Loading />;
  if (error)
    return <div className='message message_error '>Error: {error}</div>;

  const columns = [
    "Product",
    "Name",
    "Color",
    "Quantity",
    "Price",
    "Model",
    "Category",
    "Company",
    "Likes",
    "Created At",
    "Actions",
  ];

  const renderRow = (card) => (
    <TableRow key={card._id}>
      <TableCell>
        <img src={card.image.url} alt={card.image.alt} width='60' height='60' />
      </TableCell>
      <TableCell>{card.title}</TableCell>
      <TableCell>{card.color}</TableCell>
      <TableCell
        style={{
          backgroundColor:
            card.quantity < 3 ? theme.palette.rating.main : "inherit",
        }}
      >
        {card.quantity}
      </TableCell>
      <TableCell>${card.price}</TableCell>
      <TableCell>{card.model}</TableCell>
      <TableCell>{card.category}</TableCell>
      <TableCell>{card.company}</TableCell>
      <TableCell>{card.likes ? card.likes.length : 0}</TableCell>
      <TableCell>{new Date(card.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => toggleForm("edit", card)}
          style={{
            color: theme.palette.text.primary,
          }}
        >
          <DrawIcon />
        </IconButton>
        <IconButton
          onClick={() => handleDeleteCard(card)}
          style={{
            color: theme.palette.text.primary,
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <Box
      sx={{
        color: theme.palette.text.primary,
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <h1>My Products</h1>
      <Button
        variant='contained'
        size='large'
        style={{
          marginTop: "10px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
        onClick={() => toggleForm("new")}
      >
        <AddTaskIcon sx={{ display: { fontSize: 35 } }} />
        Create New Card
      </Button>
      <Box
        sx={{
          color: theme.palette.rating.main,
          fontWeight: "bold",
          mt: 1,
          mb: 1,
        }}
      >
        {criticalQuantity ? (
          "Some products have critical stock levels. Please restock!"
        ) : (
          <Typography>No critical stock levels detected.</Typography>
        )}
      </Box>

      <Box>
        {formMode === "new" && (
          <CreateProductCard
            onCardAdded={handleNewCardAdded}
            close={handleCancel}
          />
        )}
        {formMode === "edit" && (
          <UpdateProductCard
            card={currentCard}
            onCardUpdated={handleCardUpdated}
            close={handleCancel}
          />
        )}
      </Box>

      {!userCards || userCards.length === 0 ? (
        <div className='message message_empty'>
          No cards found. Click 'Create New Card' to add one.
        </div>
      ) : searchedCards.length === 0 ? (
        <div className='message message_empty'>No result found</div>
      ) : (
        <PaginationTable
          rows={searchedCards}
          columns={columns}
          renderRow={renderRow}
        />
      )}
    </Box>
  );
};

export default UserCards;
