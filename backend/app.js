import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import AuthRoutes from './routes/AuthRoutes.js';
import MenuRoutes from './routes/MenuRoute.js';
import OrderRoute from './routes/OrderRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
connectDB();

app.get('/', (req, res) => {
    res.send('Hello API!');
});

app.use("/api/User", AuthRoutes);
app.use("/api/Menu", MenuRoutes);
app.use("/api/Order", OrderRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    const statusCode = err.statusCode || 500; // Default to 500 if no status code is set
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});
