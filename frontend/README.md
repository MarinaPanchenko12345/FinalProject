# Frontend for DigitalGalaxy

## Description

This is the frontend for the DigitalGalaxy project, an e-commerce platform for selling electronics. The frontend is built with React.js and communicates with the backend via REST APIs for features like user authentication, product management, shopping cart, and order placement.

## Features

1. **User Management:**

   - **Registration and Login:**
     - Standard registration and login via JWT (JSON Web Tokens).
     - Password lockout for 24 hours after three incorrect login attempts.
   - **JWT Token Validity:**
     - The token is valid for 4 hours. After expiration, the user must log in again to obtain a new token.
   - **Password Reset:**
     - Users can request a password reset, and a reset link is sent to their email.
     - The reset link is valid for 15 minutes, during which the user can set a new password.
   - **User Operations:**
     - Users can edit their profiles and change their status.
     - User Deletion: Only admins are authorized to delete user accounts.

2. **Google OAuth Authentication:**
   **Note:**
   When a user successfully registers via Google, a new entry for the user will automatically be created in the MongoDB database.

3. **Card Management:**
   Creation, editing, deletion of cards, likes.

4. **Cart Management:**

   - Add items to the cart .
   - View and manage personal cart.
   - Update item quantities with stock validation.
   - Remove items from the cart.
   - Users cannot add their own products to the cart.

5. **Order Management:**
   - Users can create orders directly from their cart.
   - Orders contain details such as items, quantities, and prices.
   - Once an order is placed, the cart is cleared, and product quantities are updated to reflect the stock.
   - Users can view their order history

## Approaches Used

1. **TokenSlice**
   - Manages the user's token, user data, and role (admin, business, regular, guest).
   - Synchronizes with localStorage to persist sessions across page reloads.
   - Centralizes global state management, making it easier to maintain.

- **Logic:**
  - login: Saves the token, decodes it, and updates the Redux state.
  - logout: Removes the token and resets the user to the guest role.

2. **Hooks**

- Simplify API requests for cards, cart, order, and users.
- Streamline API interactions and repetitive logic, reducing code duplication.

2. **Contexts**

- Provide easy access to data and logic for specific features without complicating the code.
- Used for:
  - cards, cart, order, users.
  - Theme switching (ThemeContext).
  - Managing display modes (ModeContext).
  - Implementing search functionality (SearchContext).
  - Sorting by categories and colors (SortContext).

## Project Structure

- **frontend**
  - `public` # Static files
  - src :
    - `components` # UI components are grouped into folders within the components directory according to their theme or purpose.
    - `contexts` # Context providers features for cards, cart, orders, users, theme, search, sorting
    - `helpers` # Utility components like Loading, Alerts, and SearchBox simplify user interface functionality.
    - `hooks` # Custom hooks for API calls and logic reuse
    - `models` # Data models for the application
    - `slices` # Redux slice for state management
    - `store` # Redux store configuration
    - `validation` # Joi schemas for form validation
    - `App.js` # Root component of the application
    - `Routers.jsx ` # Application routes

## Technologies Used

- **Core Libraries:**
  - `react`, `react-dom`, `react-router-dom`
- **Fonts:**
  - Google Fonts are used to enhance typography and design consistency across the application.
- **State Management:**
  - `react-redux`, `@reduxjs/toolkit`
- **Styling:**
  - `@mui/material`, `@mui/icons-material`, `@emotion/react`
- **HTTP Requests:**
  - `axios`
- **Carousel:**
  - `react-slick`, `slick-carousel`
- **Alerts and Animations:**
  - `sweetalert2`, `react-spring`, `react-toastify`
- **Validation:**
  - `joi`
- **Utilities:**
  - `js-cookie`, `jwt-decode`, `country-list`
