import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { searchUsers } from "../../helpers/SearchBox";
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
import { useUser } from "../../contexts/UserContext";

const DeletedUsers = () => {
  const theme = useTheme();
  const { searchText } = useContext(SearchContext);
  const { fetchDeletedUsers, restoreUser, isLoading, error } = useUser();
  const [deletedUsers, setDeletedUsers] = useState([]);
  const searchedUsers = searchUsers(deletedUsers, searchText);

  useEffect(() => {
    const getDeletedUsers = async () => {
      const users = await fetchDeletedUsers();
      setDeletedUsers(users);
    };
    getDeletedUsers();
  }, [fetchDeletedUsers]);

  const handleRestore = async (id) => {
    await restoreUser(id);
    const updatedUsers = await fetchDeletedUsers();
    setDeletedUsers(updatedUsers);
  };

  if (isLoading) return <Loading />;
  if (error) return <div className='message message_error'>Error: {error}</div>;

  return (
    <div style={{ color: theme.palette.text.primary }}>
      <h1>Deleted Users</h1>
      {!searchedUsers || searchedUsers.length === 0 ? (
        <div className='message message_empty'>No deleted users found.</div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, backgroundColor: theme.palette.primary.main }}
        >
          <Table aria-label='users table'>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell sx={{ minWidth: "200px" }}>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Restore</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img
                      src={user.image.url}
                      alt={user.image.alt}
                      width='40'
                      height='40'
                      sx={{ borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell>
                    {user.name.first} {user.name.last}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    {user.isBusiness ? "Business" : "Regular"}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRestore(user._id)}
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

export default DeletedUsers;
