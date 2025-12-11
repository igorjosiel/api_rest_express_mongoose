import NotFound from "../errors/NotFound.js";
import { books } from "../models/index.js";

class BookController {
  static getBooks = async (req, res, next) => {
    try {
      const booksFound = await books.find().populate("author").exec();

      res.status(200).json(booksFound);
    } catch (error) {
      next(error);
    }
  };

  static getBookById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookFound = await books
        .findById(id)
        .populate("author", "name")
        .exec();

      if (bookFound !== null) {
        res.status(200).send(bookFound);
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static createBook = async (req, res, next) => {
    try {
      const book = new books(req.body);

      const bookFound = await book.save();

      res.status(201).send(bookFound.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateBook = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookFound = await books.findByIdAndUpdate(id, { $set: req.body });

      if (bookFound !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static removeBook = async (req, res, next) => {
    try {
      const id = req.params.id;

      const bookFound = await books.findByIdAndDelete(id);

      if (bookFound !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NotFound("Id do livro não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static getBooksByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.publisher;

      const booksFound = await books.find({ publisher });

      res.status(200).send(booksFound);
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
