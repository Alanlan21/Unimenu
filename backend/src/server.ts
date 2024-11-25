import express from 'express';
import cors from 'cors'; // Importa o pacote CORS

const app = express();
const port = 5000;

// Ativa o middleware CORS
app.use(cors());

// Outras configurações do seu backend
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
