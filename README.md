# DigitalGalaxy

DigitalGalaxy is an online store for selling electronic products such as:

- Phones
- Computers
- Laptops
- Monitors
- Keyboards
- Computer Mice
- Headphones
- Smartwatches

**_Installation_**
Follow these steps to set up and run the project:

1. **Clone the repository:**
   Create a folder and open the terminal ,use Git to clone the repository to your local machine: git clone git clone https://github.com/MarinaPanchenko12345/FinalProject

   Alternatively, you can download the repository as a ZIP file directly from GitHub: git clone https://github.com/MarinaPanchenko12345/FinalProject
   On the repository's GitHub page, click the Code button, then select Download ZIP.
   After downloading, extract the ZIP file to your local machine.

2. **Create a `.env` in the `backend` directory:**
   Use the .env.example file as a template and add the required environment variables to your .env file.

   ````##Enviroment##
   NODE_ENV="development"
   PORT=9898

   ##Mongo##
   ATLAS_DB_URL="mongodb+srv://your-username:your-password@clusternodejs.x8ooh.mongodb.net/project-node-js?retryWrites=true& w=majority&appName=ClusterNodeJs"
   MONGO_DB_URL="mongodb://127.0.0.1:27017/project-node-js"

   ##Authentication##
   JWT_SECRET="your-jwt-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   ##Session##
   SESSION_SECRET="your-session-secret"

   ##Email##
   EMAIL_USER="your-email-user"
   EMAIL_PASSWORD="your-email-password"```
   ````

   **Use`NODE_ENV="development"`for the local MongoDB Compass database or`NODE_ENV="production"`for connecting to MongoDB Atlas.**

3. **Install dependencies:**
   Install all the necessary dependencies in folder backend and frontend using npm :`npm install` This command will download all the required Node and React modules based. 4. **npm start**
   Once the installation is complete, start the project in the terminal with:`npm start`

- folder backend:
  Runs the app with Node.js.
  Requires a MongoDB Atlas Cluster and MongoDB Compass for database management.
  Uses nodemon to automatically restart the app when edits are made.
  The page will reload if you make edits.
  The terminal will print messages:
  Blue: "listening on port 9898".
  Yellow: "Connected to Local database" (if there are no login errors).
- folder frontend:
  Runs the React application.
  Automatically opens the default browser to load the homepage.
  If edits are made to the frontend code, the page will reload automatically.

### Functionality

- **Product Search and Filtering:**
  - Functional search to quickly find products.
  - Filtering by color and categories.
- **Theme and View Mode:**
  - Users can toggle between light and dark themes.
  - Option to switch between card and table views for product listings.
- **Fan Favorites and Product Cards:**
  - Each product card, including those in Fan Favorites, has a "View Product" option.
  - The "View Product" option displays all details about the product and allows users to add it to their cart.

### User Management

- **Registration and Login:**
  - Users can register and log in with an email and password.
  - Google login is supported via `passport-google-oauth20`.
  - Security features:
    - Users are blocked for 24 hours after 3 failed login attempts.
    - Password reset functionality implemented using Nodemailer, requiring a valid email address to receive a reset link (15 minutes for change).
  - Tokens for authenticated users are valid for 4 hours; after expiration, users are logged out automatically.
- **User Roles and Cards Management :**
  - **Guest:** Can browse products and like them.
  - **Registered User:** Can purchase products and upgrade to a business user from their profile.
  - **Business User:** Can purchase, create, update, delete, and restore their products. Receives notifications for low stock (if products < 3 ).
  - **Admin:** Has all the permissions of a business user and can manage other users, including viewing, deleting, and restoring them.

### **Test Accounts**

To simplify the testing process, the following accounts are available:

**Admin Account:** -**Email:** `admin@gmail.com` - **Password:** `Abc!123cAb`

**Business User Account:** -**Email:** `john@gmail.com` - **Password:** `Ab123456!`

**Regular User Account:** -**Email:** `shira@gmail.com` - **Password:** `Aa123456!`

### Additional Pages

- **Dashboard:**
- Accessible to all registered users, offering role-specific options (includes Profile, All Users, User Products, User Orders).
  -Profile management: Users can update their details.
- **Cart:**
- Each registered user has a personal cart where they can to orders.
- **Favorite:**
- Users can save their liked product cards in the Favorites section.

For more detailed information on dependencies, folder structure, and additional setup steps, please refer to the specific README files in the respective folders:

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

### Future Plans

- **Image Uploading:** Implement image uploading functionality for users and cards using Multer for efficient file management.
- **Order Management System:** Improve the order management system to allow:
  - Card owners to see which of their products have been ordered.
  - Card owners to update order statuses (e.g., "Pending", "In Transit", "Delivered").
- **User Order Tracking:** Ensure that users who place orders can view real-time updates on the status of their orders.

### Author

This project was created and maintained by [Marina Pan].
Feel free to contact me at [marishka100281@gmail.com] for questions or suggestions.

### License

All rights reserved. This project is not open for redistribution or modification without permission.
