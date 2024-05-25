import mongoose from "mongoose";
// import { authorSchema } from "./Author.js";


const bookSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  title: {
    type: String,
    required: [
      true,
      "Titulo do livro é obrigatório"]
  },
  pagerNumber: {
    type: Number,
    min: [0, "Numero de páginas deve ser maior do que 0"],
    max: [10000, "Numero de páginas deve ser menor do que 10000"],
    /*
    Fazendo uma validação personalizada
    validate: {
      validator: (value) => {
      return value >= 0 && value <= 10000;
      },
      message: "Numero de páginas incorreto"
    }
    */
  },
  price: {
    type: String,
    required: [
      true,
      "Preço do livro é obrigatório"
    ]
  },
  group: { type: String },
  editor: {
    type: String,
    /* enum: { 
      values: ["Teste Editora", "Teste editora 2"], 
      message: "Editora ({VALUE}) fornecida não é compativel com as cadastradas"} 
      // Cadastra somente o nome escrito do parametro
    */
  },
  //author: authorSchema
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "author",
    required: [
      true,
      "Autor(a) é obrigatório"
    ]
  },
  //Metodo acima é usado para cadastrar um livro junto com o autor por referencia
}, { versionKey: false });

const book = mongoose.model("book", bookSchema);

export default book;

// 6637de0a06feccb3e37d6416