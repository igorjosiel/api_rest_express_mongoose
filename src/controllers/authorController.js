import authors from "../models/Author.js";
import NotFound from "../errors/NotFound.js";

class AuthorController {
  static getAuthors = async (req, res, next) => {
    try {
      const authorsFound = await authors.find();

      res.status(200).json(authorsFound);
    } catch (error) {
      next(error);
    }
  };

  static getAuthorById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorFound = await authors.findById(id);

      if (authorFound !== null) {
        res.status(200).send(authorFound);
      } else {
        next(new NotFound("Id do autor não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static createAuthor = async (req, res, next) => {
    try {
      const newAuthor = new authors(req.body);

      const authorCreated = await newAuthor.save();

      res.status(201).send(authorCreated.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorFound = await authors.findByIdAndUpdate(id, {
        $set: req.body,
      });

      if (authorFound !== null) {
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new NotFound("Id do autor não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };

  static removeAuthor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const authorFound = await authors.findByIdAndDelete(id);

      if (authorFound !== null) {
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(new NotFound("Id do autor não localizado."));
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AuthorController;
