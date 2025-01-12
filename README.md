# full-stack-task-delivery-app

Food Delivery App
This is a MERN stack food delivery app built as an assignment for the internship at Craft My Plate. The app allows users to browse food items, add them to the cart, and proceed with orders. The project demonstrates the implementation of essential full-stack web development concepts, including frontend design, backend functionality, and seamless state management.

Features
🌟 Frontend
Designed using Bootstrap for a clean and responsive UI.
Provides an intuitive interface for users to browse food items and manage their cart.
⚙️ Backend
Built with Node.js and Express for a robust server-side architecture.
Includes API endpoints to fetch food items and manage user actions.
🛒 Cart Functionality
State management for the cart is implemented using React's useContext hook, allowing users to add, update, and view their cart items in real time.
🗂️ Database
MongoDB is used as the database to store food items, user details, and order information.
Tech Stack
Frontend: React, Bootstrap
Backend: Node.js, Express
Database: MongoDB
State Management: useContext Hook
Hosting/Deployment: Not specified
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/Saud12131/full-stack-task-delivery-app.git
cd full-stack-task-delivery-app
2. Install Dependencies
Navigate to the respective directories and install dependencies:
Backend:
bash
Copy code
cd backend
npm install
Frontend:
bash
Copy code
cd frontend
npm install
3. Set Up Environment Variables
Create a .env file in the backend directory with the following variables:

makefile
Copy code
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
4. Run the Application
Start the backend:
bash
Copy code
cd backend
nodemon app.js
Start the frontend:
bash
Copy code
cd frontend
npm run dev
Access the app in your browser at http://localhost:3000.
Key Functionality
Food Listing
Browse through a list of food items fetched from the database.
Each food item includes details like title, description, and price.
Cart Management
Add food items to the cart using useContext.
Dynamically update the cart in real-time.
Order Placement
Manage orders by integrating the cart functionality with backend APIs.
Screenshots
Homepage
(Insert a screenshot of the homepage showing the list of food items.)

Cart
(Insert a screenshot of the cart page with added food items.)

Learnings from the Assignment

Hands-on experience with the MERN stack.
State management with React hooks.
Using Bootstrap for responsive UI design.
Integration of backend APIs with the frontend.
Acknowledgments
This project was completed as part of an internship assignment for Craft My Plate. Special thanks to the team for the opportunity to demonstrate my skills.
