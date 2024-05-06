import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes
    .get("/books", BookController.listBooks)
    .get("/books/search", BookController.listBookByGroup)
    .get("/books/:id", BookController.listBookById)
    .post("/books", BookController.registerBook)
    .put("/books/:id", BookController.updateBook)
    .delete("/books/:id", BookController.deleteBook);

export default routes;