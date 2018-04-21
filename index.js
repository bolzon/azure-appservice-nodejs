/**
 * Aplicação NodeJS exemplo para rodar no Azure App Service.
 * @author Bolzon <blzn@mail.ru>
 * @date 21 de abril de 2018
 */

const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.end('Azure App Services + NodeJS rock!');
});

app.post('/trigger', (req, res) => {

  const msg = req.body; // { functionUrl, numA, numB }
  const keys = Object.keys(msg);
  if (!msg || !['functionUrl', 'numA', 'numB'].every(k => keys.includes(k))) {
    res.status(400).json({
      error: 'Mensagem tem que ser { functionUrl, numA, numB }'
    });
    return;
  }

  const postMsg = {
    form: msg,
    json: true
  };

  request.post(msg.functionUrl, postMsg, (err, response, body) => {
    if (err) {
      res.status(500).json(err);
    }
    else {
      if (response.statusCode !== 200) {
        res.status(response.statusCode).json(body);
      }
      else {
        res.json(body);
      }
    }
  });
});

// função para teste local

app.post('/sum', (req, res) => {

  const msg = req.body; // { numA, numB }
  const keys = Object.keys(msg);
  if (!msg || !['numA', 'numB'].every(k => keys.includes(k))) {
    res.status(400).json({
      error: 'Mensagem tem que ser { numA, numB }'
    });
    return;
  }

  const response = {
    numA: parseInt(msg.numA),
    numB: parseInt(msg.numB)
  };

  response.result = response.numA + response.numB;
  res.json(response);
});

const port = process.env.PORT || 1337;
app.listen(port);

console.log('Servidor rodando em http://localhost:%d', port);
