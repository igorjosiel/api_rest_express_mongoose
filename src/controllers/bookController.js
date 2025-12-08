import books from "../models/Book.js";

class BookController {
  static getBooks = async (req, res) => {
    try {
      const booksFound = await books.find().populate("author").exec();

      res.status(200).json(booksFound);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static getBookById = async (req, res) => {
    try {
      const id = req.params.id;

      const bookFound = await books
        .findById(id)
        .populate("author", "name")
        .exec();

      res.status(200).send(bookFound);
    } catch (error) {
      res
        .status(400)
        .send({ message: `${error.message} - Id do livro não localizado.` });
    }
  };

  static createBook = async (req, res) => {
    try {
      const book = new books(req.body);

      const bookFound = await book.save();

      res.status(201).send(bookFound.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar livro.` });
    }
  };

  static updateBook = async (req, res) => {
    try {
      const id = req.params.id;

      await books.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static removeBook = async (req, res) => {
    try {
      const id = req.params.id;

      await books.findByIdAndDelete(id);

      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static getBooksByPublisher = async (req, res) => {
    try {
      const publisher = req.query.publisher;

      const booksFound = await books.find({ publisher });

      res.status(200).send(booksFound);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };
}

export default BookController;
