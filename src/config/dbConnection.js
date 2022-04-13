import mongoose from "mongoose";

mongoose.connect('mongodb+srv://mongo:mongo@cluster0.8yzx8.mongodb.net/alura_node');


export const db = mongoose.connection;
