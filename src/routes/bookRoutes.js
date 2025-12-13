import express from "express";
import BookController from "../controllers/bookController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/livros", BookController.getBooks, paginate)
  .get("/livros/busca", BookController.getBooksByFilter, paginate)
  .get("/livros/:id", BookController.getBookById)
  .post("/livros", BookController.createBook)
  .put("/livros/:id", BookController.updateBook)
  .delete("/livros/:id", BookController.removeBook);

export default router;
