
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.end('Olá mundo!');
});

const port = process.env.PORT || 1337;
app.listen(port);

console.log('Servidor rodando em http://localhost:%d', port);
