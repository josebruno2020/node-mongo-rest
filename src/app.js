import express from "express";  
import { db } from "./config/dbConnection.js";
import routes from "./routes/index.js";

const app = express();

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
    console.log("conexão com banco feia com sucesso!");
});

routes(app);

export default app;