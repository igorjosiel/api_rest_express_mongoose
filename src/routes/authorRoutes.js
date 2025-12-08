import express from "express";
import AuthorController from "../controllers/authorController.js";

const router = express.Router();

router
  .get("/autores", AuthorController.getAuthors)
  .get("/autores/:id", AuthorController.getAuthorById)
  .post("/autores", AuthorController.createAuthor)
  .put("/autores/:id", AuthorController.updateAuthor)
  .delete("/autores/:id", AuthorController.removeAuthor);

export default router;
