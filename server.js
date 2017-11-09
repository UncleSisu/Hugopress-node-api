'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let { exec } = require('child_process');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(`Derpitude http://${HOST}:${PORT}`);
  res.send('Hello world\n');
});

// app.get('/wp-hugo', (req, res) => {
//   console.log(`Huuuuuugo`, req.body);
//   res.send('Hello Hugo!\n');
// });

app.post('/wp-hugo', (req, res) => {
  const cmd = JSON.parse(req.body.payload);
  if (cmd.text === 'build') {
    console.log('check dir', __dirname);

    // yarn hugo-test
    let cmd = `
    cd hugo-static-builder-module
    yarn build
    ls -la
    `;
    exec(cmd , (err, stdout, stderr) => {
      console.log(`Huuuuuugo`, stdout);
      res.send(stdout);
    });

  } else {
    console.log(`Huuuuuugo no build today`);
    res.send(cmd.text);
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
