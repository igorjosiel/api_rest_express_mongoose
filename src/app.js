import express from "express";
import db from "./config/dbConnect.js";
import router from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
router(app);

export default app;
