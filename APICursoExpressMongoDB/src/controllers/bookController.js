import book from "../models/book.js";
import { author } from "../models/Author.js";

class BookController {

  static listBooks = async (req, res) => {
    try {
      const bookList = await book.find({}); // Metodo Moongose q conecta com o database e busca o que passa dentro do parametro da função
      // const bookList = await book.find({}).populate("author").exec(); // Metodo para fazer a busca por referencia ao inves do metodo q o NoSQL usa 
      res.status(200).json(bookList);
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - 
            falha na requisição` });
    }
  };

  static listBookById = async (req, res) => {
    try {
      const id = req.params.id;
      const bookSearched = await book.findById(id); // Metodo Moongose q conecta com o database e busca o que passa dentro do parametro da função
      res.status(200).json(bookSearched);
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - 
            falha na requisição do livro` });
    }
  };

  static registerBook = async (req, res) => {
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
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - 
                Falha ao cadastrar livro`});
    }
  };

  static updateBook = async (req, res) => {
    try {
      const id = req.params.id;
      await book.findByIdAndUpdate(id, req.body);
      res.status(201).json({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - 
                Falha ao atualizar livro`});
    }
  };

  static deleteBook = async (req, res) => {
    try {
      const id = req.params.id;
      await book.findByIdAndDelete(id);
      res.status(201).json({ message: "Livro deletado com sucesso" });
    } catch (error) {
      res.status(500).json({
        message: `${error.message} - 
                Falha ao deletar livro`});
    }
  };

  static async listBookByGroup (req, res) {
    const group = req.query.group;
    try {
      const bookByGroup = await book.find({ Group: group });
      res.status(200).json(bookByGroup);
    } catch(erro){
      res.status(500).json({ message: `${erro.message} - 
            falha na busca` });
    }
  };

};

export default BookController;