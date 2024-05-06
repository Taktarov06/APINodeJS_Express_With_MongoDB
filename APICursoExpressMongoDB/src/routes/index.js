import express from 'express';
import book from "./routesBook.js";
import authors from "./routesAuthor.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200)
        .send("Curso de NodeJS"));

    app.use(express.json(), book, authors); // Usando funções express juntamente com json para conseguir fazer as requisições/respostas com o formato de dados correto

};

export default routes;
