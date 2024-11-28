import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../slices/TokenSlice";
import { showAlert } from "../../helpers/Alert";
import { useUser } from '../../contexts/UserContext';

const AuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchLoggedUser, isLoggedIn } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      dispatch(login(token));
      localStorage.setItem("token", token);
      showAlert("success", "You have successfully logged in!");
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    // Fetch logged-in user's details after login.
    if (isLoggedIn) fetchLoggedUser();
  }, [isLoggedIn, fetchLoggedUser]);


  return (
    <div className='message message_empty'>Processing Google Login...</div>
  );
};

export default AuthSuccess;
