const express = require("express");
const { randomUUID } = require("crypto");
const fs = require("fs");

const app = express();
app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (error, data) => {
  if (error) {
    console.log(error);
  } else {
    products = JSON.parse(data);
  }
});

/* Inserir produto */
app.post("/products", (req, res) => {
  const { name, price, lucro } = req.body;

  const product = {
    name,
    price,
    lucro,
    id: randomUUID(),
  };
  products.push(product);
  productFile();
  return res.json(product);
});

/* Buscar produtos */
app.get("/products", (req, res) => {
  return res.json(products);
});

/* Buscar produto */
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  return res.json(product);
});

/* Alterar produto */
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, lucro } = req.body;
  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
    price,
    lucro,
  };
  productFile();
  return res.json({ message: "Produto alterado" });
});

/* Deletar produto */
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1);
  productFile();
  return res.json({ message: "Você deletou um produto" });
});

function productFile() {
  fs.writeFile("products.json", JSON.stringify(products), (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Produto inserido");
    }
  });
}

app.listen(30, () => {
  console.log("servidor ta comendo");
});
