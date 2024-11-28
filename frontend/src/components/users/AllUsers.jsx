import React, { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContext";
import { searchUsers } from "../../helpers/SearchBox";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DeleteIcon from "@mui/icons-material/Delete";
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
import { showAlert } from "../../helpers/Alert";

const AllUsers = ({ setActiveComponent, setSelectedUserId }) => {
  const { users, deleteUser, isLoading, error } = useUser();
  const { searchText } = useContext(SearchContext);
  const theme = useTheme();

  const searchedUsers = searchUsers(users, searchText);

  const handleViewUser = (userId) => {
    setSelectedUserId(userId);
    setActiveComponent("ViewUser");
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      showAlert("error", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className='message message_error'>Error: {error}</div>;

  return (
    <div style={{ color: theme.palette.text.primary }}>
      <h1>Users</h1>
      {!searchedUsers || searchedUsers.length === 0 ? (
        <div className='message message_empty'>No users found.</div>
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
                <TableCell>Actions</TableCell>
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
                      onClick={() => handleViewUser(user._id)}
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(user._id)}
                      sx={{
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
      )}
    </div>
  );
};

export default AllUsers;
