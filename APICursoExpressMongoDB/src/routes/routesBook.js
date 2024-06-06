import express from "express";
import BookController from "../controllers/bookController.js";
import Pager from "../middlewares/Pager.js";

const routes = express.Router();

routes
  .get("/books", BookController.listBooks, Pager)
  .get("/books/search", BookController.listBookBySearch, Pager)
  .get("/books/:id", BookController.listBookById)
  .post("/books", BookController.registerBook)
  .put("/books/:id", BookController.updateBook)
  .delete("/books/:id", BookController.deleteBook);

export default routes;