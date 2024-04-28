import dotenv from 'dotenv';
dotenv.config();

import { connect } from "mongoose";

async function dbConnect() :Promise<void>{
    const DB_URI = process.env.DB_URI;
    console.log(DB_URI);
    await connect(DB_URI);
}

export default dbConnect;
