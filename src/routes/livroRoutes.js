import express from "express";
import livrosController from "../controllers/livrosController.js";

const livroRoutes = express.Router();

livroRoutes.get('/', livrosController.getAll)
    .get('/busca/editora', livrosController.findByEditora)
    .get('/:id', livrosController.getOne)
    .post('/', livrosController.create)
    .put('/:id', livrosController.update)
    .delete('/:id', livrosController.delete);



export default livroRoutes;
