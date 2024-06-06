import PageNotFound from "../Errors/pageNotFound.js";
import { author, book } from "../models/index.js";


class BookController {

  static listBooks = async (req, res, next) => {
    try {
      const resultSearch = book.find();
      req.result = resultSearch;
      next();
      // const bookList = await book.find({}); // Metodo Moongose q conecta com o database e busca o que passa dentro do parametro da função
    } catch (e) {
      console.error(e.message);
      next(e);
    }
  };

  static listBookById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const bookSearched = await book.findById(id); // Metodo Moongose q conecta com o database e busca o que passa dentro do parametro da função
      if (bookSearched) {
        res.status(200).json(bookSearched);
      } else {
        next(new PageNotFound("Livro não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  };

  static registerBook = async (req, res, next) => {
    const bookNew = req.body;
    try {
      const newBook = await book.create(bookNew); // Caso faça por referencia, é assim q usa o metodo de criação de livro
      // const authorSearched = await author.findById(bookNew.author);
      // const completyBook = { ...bookNew, author: { ...authorSearched } };
      // const newBook = await book.create(completyBook);
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
      const result = await book.findByIdAndUpdate(id, req.body);
      if (result) {
        res.status(201).json({ message: "Livro atualizado com sucesso" });
      } else {
        next(new PageNotFound("Livro não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  };

  static deleteBook = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await book.findByIdAndDelete(id);
      if (result) {
        res.status(201).json({ message: "Livro deletado com sucesso" });
      } else {
        next(new PageNotFound("Livro não encontrado"));
      }
    } catch (e) {
      next(e);
    }
  };

  static listBookBySearch = async (req, res, next) => {
    try {
      const resultQuery = await searchBook(req.query);
      if (resultQuery) {
        const result = book
          .find(resultQuery)
          .populate("author");

          req.result = result;

          next();
      } else {
        res.status(200).send([]);
      }

    } catch (e) {
      next(e);
    }
  };
};

async function searchBook(values) {
  const { group, title, minPages, maxPages, nameAuthor } = values;
  const regex = RegExp(title, "i");
  let search = {};

  if (group) search.group = group;
  if (title) search.title = regex;

  if (minPages || maxPages) search.pagerNumber = {};

  if (minPages) search.pagerNumber.$gte = minPages;
  if (maxPages) search.pagerNumber.$lte = maxPages;

  if (nameAuthor) {
    const authors = await author.findOne({ name: nameAuthor });
    if (authors) {
      search.author = authors._id;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;