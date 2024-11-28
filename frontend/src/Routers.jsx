import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/about/About";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import AuthSuccess from "./components/auth/AuthSuccess";
import ResetPassword from "./components/auth/ResetPassword";
import CreateNewPassword from "./components/auth/CreateNewPassword";
import UserCards from "./components/products/UserCards";
import Favorite from "./components/products/Favorite";
import Cart from "./components/cart/Cart";
import ViewProductCard from "./components/products/view/ViewProductCard";
import Profile from "./components/users/Profile";
import AllUsers from "./components/users/AllUsers";
import ViewUser from "./components/users/ViewUser";
import Orders from "./components/orders/Orders";
import Dashboard from "./components/dashboard/Dashboard";
import Overview from './components/dashboard/Overview';
import DeletedUsers from './components/users/DeletedUsers';
import DeletedCards from './components/products/DeletedCards';

const Routers = ({ location }) => {
  return (
    <div>
      <Routes location={location}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/auth-success' element={<AuthSuccess />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/create-new-password/:token'
          element={<CreateNewPassword />}
        />
        <Route path='/user-cards' element={<UserCards />} />
        <Route path='/deleted-cards' element={<DeletedCards/>} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/deleted-users' element={<DeletedUsers />} />
        <Route path='/view-user' element={<ViewUser />} />
        <Route path='/cards/:id' element={<ViewProductCard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/overview' element={<Overview />} />
      </Routes>
    </div>
  );
};

export default Routers;
