import "dotenv/config";
import app from "./src/app.js"

const PORT = 3000;

// const server = http.createServer((req,res) => {
//     res.writeHead(200, { "Content-Type": "text/plain"}); // Declarando uma requisi~]ao e o tipo dela
//     res.end(routes[req.url]); //Body da resposta da requisição
// });

app.listen(PORT, () => {
    console.log("Servidor escutando");
}); // Primeiro parametro do "listen" numero da porta da conexão
