import { author } from "../models/index.js";
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
      const result = await author.findByIdAndUpdate(id, req.body);
      if (result) {
        res.status(200).json({ message: "autor atualizado" });
      } else {
        next(new PageNotFound("Autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  };

  static deleteAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await author.findByIdAndDelete(id);
      if (result) {
        res.status(200).json({ message: "autor excluído com sucesso" });
      } else {
        next(new PageNotFound("Autor não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  };

  static searchAuthor = async (req, res, next) => {
    const resultQuery = req.query;
    try {
      const result = await author.find(resultQuery);
      res.status(200).json(result);
    } catch(e) {
      next(e);
    }
  };
};

export default AuthorController;