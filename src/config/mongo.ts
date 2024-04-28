import dotenv from 'dotenv';
dotenv.config();

import { connect } from "mongoose";

async function dbConnect() :Promise<void>{
    const DB_URI = process.env.DB_URI || 'mongodb+srv://susanatraidora:susanatraidora@susanatraidora.c3i0bcf.mongodb.net/';
    console.log(DB_URI);
    await connect(DB_URI);
}

export default dbConnect;
