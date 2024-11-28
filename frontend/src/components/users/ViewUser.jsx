import React, { useEffect } from "react";
import "./ViewUser.css";

import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Loading from '../../helpers/loading/Loading';
import { useTheme } from "@mui/material/styles";
import { useUser } from '../../contexts/UserContext';

const ViewUser = ({ userId, setActiveComponent }) => {
 const { fetchUserById, currentUser, isLoading, error } = useUser(); 
   const theme = useTheme();


  useEffect(() => {
    if (userId) {
      fetchUserById(userId); 
    }
  }, [fetchUserById, userId]);


  const handleCloseClick = () => {
    setActiveComponent("All Users");
  };
  
  if (isLoading) return <Loading />;
  if (error) return <div className='message message_error'>Error: {error}</div>;
  if (!currentUser || currentUser.length === 0)
    return <div className='message message_empty'>No users found</div>;

  return (
    <div
      className='view_user'
      style={{
        color: theme.palette.text.primary,
      }}
    >
      <div className='view_header'>
        <h2>User Profile</h2>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleCloseClick}
          className='close_button'
          startIcon={<CloseIcon />}
        >
          Close
        </Button>
      </div>
      <div className='view_block'>
        <div
          className='view_user_image'
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <img src={currentUser.image.url} alt={currentUser.title} />
        </div>

        <div
          className='view_user_info'
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <p>
            <strong>Name :</strong> {currentUser.name.first}{" "}
            {currentUser.name.middle}
            {currentUser.name.last}
          </p>
          <p>
            <strong>Email :</strong> {currentUser.email}
          </p>
          <p>
            <strong>Phone :</strong> {currentUser.phone}
          </p>
          <p>
            <strong>Country :</strong> {currentUser.address.country}
          </p>
          <p>
            <strong>City :</strong> {currentUser.address.city}
          </p>
          <p>
            <strong>Street :</strong> {currentUser.address.street},
            {currentUser.address.houseNumber}
          </p>
          <p>
            <strong>ZIP Code :</strong> {currentUser.address.zip || "N/A"}
          </p>
          <p>
            <strong>Status :</strong>{" "}
            {currentUser.isBusiness ? "Business" : "Regular"}
          </p>
          <p>
            <strong>Created At:</strong>
            {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
