import express from "express";
import AuthorController from "../controllers/authorController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/autores", AuthorController.getAuthors, paginate)
  .get("/autores/:id", AuthorController.getAuthorById)
  .post("/autores", AuthorController.createAuthor)
  .put("/autores/:id", AuthorController.updateAuthor)
  .delete("/autores/:id", AuthorController.removeAuthor);

export default router;
