import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
import { connectDB } from './database/connectDB.js';
app.use('/', authRoutes);


// Middleware to parse JSON bodies
app.use(express.json());

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database:", error);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
})