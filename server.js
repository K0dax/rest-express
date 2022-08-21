const http = require("http");
http
  .createServer((req, res) => {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    if (req.url === "/product") {
      res.end(
        JSON.stringify({
          message: "Rota de produto",
        })
      );
    } else if (req.url === "/user") {
      res.end(
        JSON.stringify({
          message: "Rota de usuáro",
        })
      );
    } else {
      res.end(
        JSON.stringify({
          message: "qualquer outra rota",
        })
      );
    }
  })
  .listen(3000, () => {
    console.log("servidor rodando");
  });
