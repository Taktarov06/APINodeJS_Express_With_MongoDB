import book from "../models/book.js";
import { author } from "../models/Author.js";

class BookController {

  static listBooks = async (req, res, next) => {
    try {
      const bookList = await book.find({}); // Metodo Moongose q conecta com o database e busca o que passa dentro do parametro da função
      // const bookList = await book.find({}).populate("author").exec(); // Metodo para fazer a busca por referencia ao inves do metodo q o NoSQL usa 
      res.status(200).json(bookList);
    } catch (e) {
      next(e);
    }
  };

  static listBookById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookSearched = await book.findById(id); // Metodo Moongose q conecta com o database e busca o que passa dentro do parametro da função
      res.status(200).json(bookSearched);
    } catch (e) {
      next(e);
    }
  };

  static registerBook = async (req, res, next) => {
    const bookNew = req.body;
    try {
      // const newBook await book.create(bookNew); Caso faça por referencia, é assim q usa o metodo de criação de livro
      const authorSearched = await author.findById(bookNew.author);
      const completyBook = { ...bookNew, author: { ...authorSearched } };
      const newBook = await book.create(completyBook);
      res.status(201).json({
        message: "Criado com sucesso",
        livro: newBook
      });
    } catch (e) {
      next(e);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(201).json({ message: "Livro atualizado com sucesso" });
    } catch (e) {
      next(e);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id);
      res.status(201).json({ message: "Livro deletado com sucesso" });
    } catch (e) {
      next(e);
    }
  };

  static async listBookByGroup (req, res, next) {
    const group = req.query.group;
    try {
      const bookByGroup = await book.find({ Group: group });
      res.status(200).json(bookByGroup);
    } catch (e) {
      next(e);
    }
  };

};

export default BookController;