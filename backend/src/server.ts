"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");

const app = (0, express_1.default)();
const port = 5000;


app.use((0, cors_1.default)({
  origin: 'http://localhost:8081', // Permite apenas essa origem
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
