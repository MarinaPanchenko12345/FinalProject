import React, { useContext, useEffect, useState } from "react";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Loading from "../../helpers/loading/Loading";
import { useTheme } from "@mui/material/styles";
import { useCardsUser } from "../../contexts/CardsUserContext";
import { searchCards } from "../../helpers/SearchBox";
import { SearchContext } from "../../contexts/SearchContext";

const DeletedCards = () => {
  const theme = useTheme();
  const { searchText } = useContext(SearchContext);
  const { fetchDeletedUserCards, restoreCard, isLoading, error } =
    useCardsUser();
  const [deletedCards, setDeletedCards] = useState([]);

  useEffect(() => {
    const getDeletedCards = async () => {
      const cards = await fetchDeletedUserCards();
      setDeletedCards(cards);
    };
    getDeletedCards();
  }, [fetchDeletedUserCards]);

  const handleRestore = async (id) => {
    await restoreCard(id);
    const updatedCards = await fetchDeletedUserCards();
    setDeletedCards(updatedCards);
  };

  const searchedCards = searchCards(deletedCards, searchText);

  if (isLoading) return <Loading />;
  if (error) return <div className='message message_error'>Error: {error}</div>;

  return (
    <div style={{ color: theme.palette.text.primary }}>
      <h1>Deleted Users</h1>
      {!searchedCards || searchedCards.length === 0 ? (
        <div className='message message_empty'>No deleted cards found.</div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, backgroundColor: theme.palette.primary.main }}
        >
          <Table aria-label='users table'>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Color</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Likes</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Restore</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedCards.map((card) => (
                <TableRow key={card._id}>
                  <TableCell>
                    <img
                      src={card.image.url}
                      alt={card.image.alt}
                      width='40'
                      height='40'
                      sx={{ borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>{card.title}</TableCell>
                  <TableCell>{card.color}</TableCell>
                  <TableCell>{card.quantity}</TableCell>
                  <TableCell>{card.price}</TableCell>
                  <TableCell>{card.model}</TableCell>
                  <TableCell>{card.category}</TableCell>
                  <TableCell>{card.company}</TableCell>
                  <TableCell>{card.likes ? card.likes.length : 0}</TableCell>
                  <TableCell>
                    {new Date(card.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRestore(card._id)}
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    >
                      <RestoreFromTrashIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DeletedCards;
