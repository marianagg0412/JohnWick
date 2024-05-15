import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConnect from './config/mongo';
import {router} from "./routes";

const PORT = process.env.PORT || 8081;
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

dbConnect().then(() => console.log('Connected to db'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
