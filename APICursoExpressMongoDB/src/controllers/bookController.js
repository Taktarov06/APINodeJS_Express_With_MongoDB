import PageNotFound from "../Errors/pageNotFound.js";
import { author, book } from "../models/index.js";
import IncorrectRequest from "../Errors/incorrectRequest.js";


class BookController {

  static listBooks = async (req, res, next) => {
    try {
      let { limit = 5, page = 1 } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);
      if (limit > 0 && page > 0) {
        const bookList = await book.find({})
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("author")
          .exec(); // Metodo para fazer a busca por referencia ao inves do metodo q o NoSQL usa 
        res.status(200).json(bookList);
      } else {
        next(new IncorrectRequest());
      }
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
        const result = await book
          .find(resultQuery)
          .populate("author");

        res.status(200).json(result);
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