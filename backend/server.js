import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
import authRoutes from './routes/authRoutes.js';

app.use('/', authRoutes);


// Middleware to parse JSON bodies
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 

app.get('/', (req, res) => {
    res.send('Hello World!');
})