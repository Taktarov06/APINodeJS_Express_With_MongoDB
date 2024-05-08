import mongoose from "mongoose";


// eslint-disable-next-line no-unused-vars
function errorManipulator(e, req, res, next) {
  if (e instanceof mongoose.Error.CastError) {
    res.status(400).send({ message: "Dados da requisição incorretos." });
  } else {
    res.status(500).send({ message: "Erro interno do servidor" });
  }
}


export default errorManipulator;