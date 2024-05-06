import express from "express";
import dataBaseConnect from "./config/dbconnect.js";
import routes from "./routes/index.js";

const connection = await dataBaseConnect(); // Conecta o app.js com o arquivo de conexão com o banco MongoDB

// Metodo on espera um evento que quando ocorrer, nesse caso, mostra o erro de conexã do mongoose com o MongoDB
connection.on("error",  (erro) => {
    console.error("Conexão falha", erro);
});

// Metodo once tenta realizar a conexão com o evento "open", ou seja quando a conexão forbem sucedida.
connection.once("open", () => {
    console.log("Conexão bem sucedida");
})

const app = express();
routes(app);

// function searchBook (id){
//     return livros.findIndex(livro => { // Funcção JS para buscar o index de um componente em um array
//         return livro.id === Number(id); // Retorna o index como forma de numero
//     })
// } // Função para buscar o id de um livro dentro do "banco de dados"

/*
Quando fazemos uma requisição, a comunicação de dados funciona da seguinte forma
    A requisição manda um cabeçalho com as informações necessárias para acessar a API
    O corpo da requisição é acessado pelo req.body
    Existem outros metodos de requisição que devo olhar na documentação
*/

// Metodo GET usado para buscar dados
// app.get("/", (req, res) => {
//     res.status(200).send("Curso NodeJS");
// });

// app.get("/books", async (req, res) => {
//     const bookList = await book.find({}); // Metodo Moongose q conecta com o database e busca o que passa dentro do parametro da função
//     res.status(200).json(bookList);
// });

// Para passar um parametro variavel em uma requisição GET, usa ":"
// app.get("/livros/:id", (req, res) => {
//     const index = searchBook(req.params.id); // Params é um metodo http que salva os parametros declarados na requisição após o ":"
//     res.status(200).json(livros[index]);
// });

// Metodo POST usado para criar dados
// app.post("/livros", (req, res) => {
//     livros.push(req.body); // Toda requisição vem junto um corpo, req.body acessa o corpo da requisição feita
//     res.status(201).send("Livro cadastrado com sucesso");
// });

// app.put("/livros/:id", (req, res) => {
//     const index = searchBook(req.params.id);
//     livros[index].title = req.body.title;
//     res.status(200).json(livros);
// })

// app.delete("/livros/:id", (req, res) => {
//     const index = searchBook(req.params.id);
//     livros.splice(index, 1);
//     res.status(200).send("Livro deletado com sucesso");
// })


export default app;
