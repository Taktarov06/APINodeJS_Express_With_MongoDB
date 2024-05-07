import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

routes
  .get("/authors", AuthorController.listAuthors)
  .get("/authors/:id", AuthorController.listAuthorById)
  .post("/authors", AuthorController.registerAuthor)
  .put("/authors/:id", AuthorController.updateAuthor)
  .delete("/authors/:id", AuthorController.deleteAuthor);

export default routes;