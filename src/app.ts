import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConnect from './config/mongo';

const PORT = process.env.PORT || 8081;
const app = express();
app.use(cors());
app.use(express.json());

dbConnect().then(() => console.log('Connected to db'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
