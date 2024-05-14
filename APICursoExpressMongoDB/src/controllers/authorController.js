import { author } from "../models/Author.js";
import PageNotFound from "../Errors/pageNotFound.js";

class AuthorController {

  static listAuthors = async (req, res, next) => {
    try {
      const listaAuthores = await author.find({});
      res.status(200).json(listaAuthores);
    } catch (e) {
      next(e);
    }
  };

  static listAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const authorResult = await author.findById(id);
      if (authorResult) {
        res.status(200).json(authorResult);
      } else {
        next(new PageNotFound("Autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  };

  static registerAuthor = async (req, res, next) => {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({
        message: "criado com sucesso",
        livro: newAuthor
      });
    } catch (e) {
      next(e);
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado" });
    } catch (e) {
      next(e);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (e) {
      next(e);
    }
  };
};

export default AuthorController;