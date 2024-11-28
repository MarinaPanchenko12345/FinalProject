Backend for FinalProject

**_Description_**
NodeJsProject is a server-side application built with Node.js using Express.js and MongoDB/MongoDB Atlas for managing user and card data. The project implements user authentication, cards and users management,and uses JWT to secure routes and perform authorization. Additionally, it includes a shopping cart feature for managing products and supports user orders.

## Features

1. **User Management:**

   - User registration and authentication (standard registration and login via JWT).
   - Creation, editing, deletion of users, and status change.
   - Password lockout for 24 hours after three incorrect login attempts.
   - **JWT Token Validity:**
     - The token is valid for 4 hours. After expiration, the user must log in again to obtain a new token.
   - **Password Reset:**
     - Users can request a password reset, and a reset link is sent to their email.
     - The reset link is valid for 15 minutes, during which the user can set a new password.

2. **Google OAuth Authentication:**
   **Note:**
   When a user successfully registers via Google, a new entry for the user will automatically be created in the MongoDB database.
   After a successful registration, the user's JWT token will be generated and displayed in the terminal console.

3. **Card Management:**
   Creation, editing, deletion of cards, likes, and bizNumber updates.
   **Note:**
   The users and cards is not permanently deleted but rather marked with an `isDeleted` flag set to `true`. This approach allows preserving the user's data for potential recovery or analysis, providing protection against accidental deletion and maintaining data integrity.
4. **Cart Management:**
   - Add items to the cart.
   - View and manage personal cart.
   - Update item quantities with stock validation.
   - Remove items from the cart.
   - Users cannot add their own products to the cart.
5. **Order Management:**
   - Users can create orders directly from their cart.
   - Orders contain details such as items, quantities, and prices.
   - Once an order is placed, the cart is cleared, and product quantities are updated to reflect the stock.
   - Users can view their order history
6. **Logging:**
   Logging of all requests using morgan with custom formats from chalk and moment.
   Logs with status codes 400 and above are recorded in the logs folder with a file for each day.

7. **API Documentation:**
      A detailed description of all API endpoints is available in the Postman documentation. To use and test the requests via Postman, you can follow this link: https://documenter.getpostman.com/view/35946649/2sAYBXAqCp#d5beaffe-e5ef-4a02-a0ef-824b81c4eb5c

   **Note:**
   The logs folder and log files are created automatically after the first error with a status code of 400 or above.

   ### Data and Media Management

- **Initial Data:**
  - Predefined database including products and users (with an admin account).
- **Image Sources:**
  - Images sourced from:
    - [Freepik](https://www.freepik.com/)
    - [Vecteezy](https://www.vecteezy.com/)

## Technologies Used

- **Core Libraries:**
  - `express`, `cors`, `dotenv`, `mongoose`, `jsonwebtoken`
- **Authentication:**
  - `passport`, `passport-google-oauth20`, `express-session`
  - **Password Management:**
    - `bcrypt`
- **Validation:**
  - `joi`
- **Email Support:**
  - `nodemailer`
- **Session Management:**
  - `express-session`
- **Utilities:**
  - `chalk`, `moment`, `morgan`, `country-list`
- **File Management:**
  - `fs` (File System)
- **Data Processing:**
  - `jwt-decode` (for decoding tokens)
- **Request Logging:**
  - `morgan`
- **Environment Management:**
  - `dotenv`
- **Additional Libraries:**
  - `country-list` – For working with country lists.
  - `fs` (File System) – For handling file uploads and file system operations.
  - `jwt-decode` – For decoding JWT tokens.

### Project Structure
- **backend**
  - `handlers`      # Manages users, cards, cart, orders,authentication, and google authentication
  - `helpers`       # Functions for connecting to the database (local or Atlas).
  - `initial-data`  # Files with initial data (users and cards), and logic for initializing data in the database
  - `middlewares`   # Handles CORS, authentication, logging, and error processing
  - `public`        # Static files (images)
  - `uploads`       # Folder with cards and users images for initial-data
  - `routes`        # The main application router, combining routes for cards, users and Google Auth.
  - `utils`         # General error handler for validation and server errors
  - `server`        # Main file for starting the server


### Server Setup

Sets up and starts the server:

- Loads environment variables using dotenv.
- Configures the database, middleware, and routing.
- Serves static files and handles 404 and 500 errors.
- Logs startup details using chalk.
