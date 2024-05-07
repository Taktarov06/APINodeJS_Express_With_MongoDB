import mongoose from "mongoose";

async function dataBaseConnect(){
  mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
}

export default dataBaseConnect;

/*
    Arquivo proprio para conexão com o banco MongoDB.
    Biblioteca Mongoose serve para conexões com mais de um tipo de banco 
    No caso do MongoDB, usamos a string com os dados de acesso.
*/