import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Profile.css";
import Button from "@mui/material/Button";
import DrawIcon from "@mui/icons-material/Draw";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import UpdateProfile from "./UpdateProfile";
import Loading from "../../helpers/loading/Loading";
import { useTheme } from "@mui/material/styles";
import { useUser } from "../../contexts/UserContext";
import { showAlert } from "../../helpers/Alert";

const MyProfile = () => {
  const {
    userId,
    fetchUserById,
    currentUser,
    updateUser,
    handleChangeStatus,
    isLoading,
    error,
  } = useUser();
  const role = useSelector((state) => state.token.role);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (userId) {
      fetchUserById(userId);
    }
  }, [fetchUserById, userId]);

  const openUpdateForm = () => {
    setIsUpdateOpen(true);
  };

  const closeUpdateForm = () => {
    setIsUpdateOpen(false);
  };

  const handleUserUpdated = async (updatedData) => {
    try {
      await updateUser(userId, updatedData);
      closeUpdateForm();
    } catch (error) {
      showAlert("error", error);
    }
  };
  // Change Status
  const handleStatusChange = async () => {
    try {
      await handleChangeStatus(currentUser.isBusiness);
    } catch (error) {
      showAlert("error", error);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div className='message message_error'>Error: {error}</div>;
  if (!currentUser || currentUser.length === 0)
    return <div className='message message_empty'>No users found</div>;

  const status = currentUser.isAdmin
    ? "Admin"
    : currentUser.isBusiness
    ? "Business"
    : "Regular";

  return (
    <div
      className='profile_container'
      style={{
        color: theme.palette.text.primary,
      }}
    >
      <div className='profile_header'>
        <h1>Profile</h1>
      </div>

      <div className='profile_block'>
        <div
          className='profile_image'
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <img src={currentUser.image.url} alt={currentUser.image.alt} />
        </div>

        <div
          className='profile_info'
          style={{
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <p>
            <strong>Name:</strong> {currentUser.name.first}
            {currentUser.name.middle && `${currentUser.name.middle} `}{" "}
            {currentUser.name.last}
          </p>
          <p>
            <strong>Email :</strong> {currentUser.email}
          </p>
          <p>
            <strong>Phone :</strong> {currentUser.phone}
          </p>
          <p>
            <strong>Status :</strong> {status}
          </p>
          <p>
            <strong>Country :</strong> {currentUser.address.country}
          </p>
          <p>
            <strong>City :</strong> {currentUser.address.city}
          </p>
          <p>
            <strong>Street :</strong> {currentUser.address.street}
            {currentUser.address.houseNumber}
          </p>
          <p>
            <strong>ZIP Code :</strong> {currentUser.address.zip || "N/A"}
          </p>
          <p>
            <strong>Created At :</strong>{" "}
            {new Date(currentUser.createdAt).toLocaleDateString()}
          </p>

          <div className='profile_button_div'>
            <Button
              variant='contained'
              startIcon={<DrawIcon />}
              className='profile_button'
              onClick={openUpdateForm}
              style={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.primary,
              }}
            >
              Update
            </Button>

            {role === "regular" &&
              !currentUser.isBusiness &&
              !currentUser.isAdmin && (
                <>
                  <p>
                    If you want to become a business user and start selling your
                    own products, you can change your status here.
                  </p>
                  <Button
                    variant='contained'
                    startIcon={<AutorenewIcon />}
                    className='profile_button'
                    onClick={handleStatusChange}
                    style={{
                      backgroundColor: theme.palette.secondary.main,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Change Status
                  </Button>
                </>
              )}
          </div>
        </div>
      </div>

      {isUpdateOpen && (
        <UpdateProfile
          user={currentUser}
          onUserUpdated={handleUserUpdated}
          close={closeUpdateForm}
        />
      )}
    </div>
  );
};

export default MyProfile;
