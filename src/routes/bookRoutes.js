import express from "express";
import BookController from "../controllers/bookController.js";

const router = express.Router();

router
  .get("/livros", BookController.getBooks)
  .get("/livros/busca", BookController.getBooksByPublisher)
  .get("/livros/:id", BookController.getBookById)
  .post("/livros", BookController.createBook)
  .put("/livros/:id", BookController.updateBook)
  .delete("/livros/:id", BookController.removeBook);

export default router;
