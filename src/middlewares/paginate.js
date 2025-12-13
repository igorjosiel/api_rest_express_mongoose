import BadRequest from "../errors/BadRequest.js";

async function paginate(req, res, next) {
  try {
    let { limite = 5, pagina = 1, ordenacao = "_id:-1" } = req.query;

    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const result = req.result;

    if (limite > 0 && pagina > 0) {
      const pagedResults = await result
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        .exec();

      res.status(200).json(pagedResults);
    } else {
      next(new BadRequest());
    }
  } catch (error) {}
}

export default paginate;
