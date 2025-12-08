import mongoose from "mongoose";
import authors from "../models/Author.js";

class AuthorController {
  static getAuthors = async (req, res) => {
    try {
      const authorsFound = await authors.find();

      res.status(200).json(authorsFound);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static getAuthorById = async (req, res) => {
    try {
      const id = req.params.id;

      const authorFound = await authors.findById(id);

      if (authorFound !== null) {
        res.status(200).send(authorFound);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res
          .status(400)
          .send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res.status(500).send({ message: "Erro interno de servidor." });
      }
    }
  };

  static createAuthor = async (req, res) => {
    try {
      const newAuthor = new authors(req.body);

      const authorCreated = await newAuthor.save();

      res.status(201).send(authorCreated.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${erro.message} - falha ao cadastrar Autor.` });
    }
  };

  static updateAuthor = async (req, res) => {
    try {
      const id = req.params.id;

      await authors.findByIdAndUpdate(id, { $set: req.body });

      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: erro.message });
    }
  };

  static removeAuthor = async (req, res) => {
    try {
      const id = req.params.id;

      await authors.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor removido com sucesso" });
    } catch (error) {
      res.status(500).send({ message: erro.message });
    }
  };
}

export default AuthorController;
