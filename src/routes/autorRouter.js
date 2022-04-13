import express from "express";
import autoresController from "../controllers/autoresController.js";

const autorRoutes = express.Router();

autorRoutes.get('/', autoresController.getAll)
    .post('/', autoresController.create)
    .get('/:id', autoresController.getOne)
    .put('/:id', autoresController.update)
    .delete('/:id', autoresController.delete);

export default autorRoutes;