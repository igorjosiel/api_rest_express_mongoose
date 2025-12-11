import express from "express";
import db from "./config/dbConnect.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import handler404 from "./middlewares/handler404.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
router(app);

app.use(handler404);
app.use(errorHandler);

export default app;
