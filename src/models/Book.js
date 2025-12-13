import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: [true, "O título do livro é obrigatório."],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "authors",
    required: [true, "O(a) autor(a) é obrigatório."],
    autopopulate: { select: "name" },
  },
  price: { type: Number },
  publisher: {
    type: String,
    required: [true, "A editora é obrigatória."],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um valor permitido.",
    },
  },
  pages: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message:
        "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}.",
    },
  },
});

bookSchema.plugin(autopopulate);

const books = mongoose.model("books", bookSchema);

export default books;
