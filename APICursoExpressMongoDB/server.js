import "dotenv/config";
import app from "./src/app.js";

const port = process.env.PORT || 3000;
// const server = http.createServer((req,res) => {
//     res.writeHead(200, { "Content-Type": "text/plain"}); // Declarando uma requisi~]ao e o tipo dela
//     res.end(routes[req.url]); //Body da resposta da requisição
// });

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
}); // Primeiro parametro do "listen" numero da porta da conexão
