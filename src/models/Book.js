import mongoose from "mongoose";

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
  },
  price: { type: Number },
  publisher: {
    type: String,
    required: [true, "A editora é obrigatória."],
  },
  pages: { type: Number },
});

const books = mongoose.model("books", bookSchema);

export default books;
