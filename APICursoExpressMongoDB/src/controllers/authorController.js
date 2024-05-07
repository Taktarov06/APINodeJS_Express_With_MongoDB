import { author } from "../models/Author.js";

class AuthorController {

  static listAuthors = async (req, res) => {
    try {
      const listaAuthores = await author.find({});
      res.status(200).json(listaAuthores);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - 
      falha na requisição` });
    }
  };

  static listAuthorById = async (req, res) => {
    try {
      const id = req.params.id;
      const authorSearched = await author.findById(id);
      res.status(200).json(authorSearched);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - 
      falha na requisição do autor` });
    }
  };

  static registerAuthor = async (req, res) => {
    try {
      const newAuthor = await author.create(req.body);
      res.status(201).json({ message: "criado com sucesso", 
        livro: newAuthor });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - 
      falha ao cadastrar autor` });
    }
  };

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await author.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "autor atualizado" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - 
      falha na atualização` });
    }
  };

  static deleteAuthor = async (req, res) => {
    try {
      const id = req.params.id;
      await author.findByIdAndDelete(id);
      res.status(200).json({ message: "autor excluído com sucesso" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - 
      falha na exclusão` });
    }
  };
};

export default AuthorController;