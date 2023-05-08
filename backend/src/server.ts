import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/projectTFG')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

const db = mongoose.connection;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});