import express from "express";
import AuthorController from "../controllers/authorController.js";
import Pager from "../middlewares/Pager.js";

const routes = express.Router();

routes
  .get("/authors", AuthorController.listAuthors, Pager)
  .get("/authors/:id", AuthorController.listAuthorById)
  .post("/authors", AuthorController.registerAuthor)
  .put("/authors/:id", AuthorController.updateAuthor)
  .delete("/authors/:id", AuthorController.deleteAuthor);

export default routes;