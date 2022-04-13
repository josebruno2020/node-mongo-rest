import express from "express";
import autorRoutes from "./autorRouter.js";
import livroRoutes from "./livroRoutes.js";

const routes = (app) => {
    app.use(express.json())

    app.route('/').get((req, res) => {
        return res.status(200).json({titulo: 'curso de node'});
    })

    app.use('/livros', livroRoutes);

    app.use('/autores', autorRoutes);
};


export default routes;