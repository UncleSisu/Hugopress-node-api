'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
let { exec } = require('child_process');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';
// const WP_URL = `http://127.0.0.1/starter/wordpress/index.php/wp-json/wp/v2`;

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
  const wpInstructions = JSON.parse(req.body.payload);
  switch (wpInstructions.text) {
    case 'build-page':
      // let command = `
      // cd hugo-static-builder-module
      // yarn build
      // ls -la
      // `;
      // exec(command , (err, stdout, stderr) => {
      //   console.log(`Huuuuuugo`, stdout);
      //   res.send(stdout);
      // });
      console.log(`Hugo post build-page`, wpInstructions);
      res.send(wpInstructions);
      break;
    case 'build-generic':
      // let command = `
      // cd hugo-static-builder-module
      // yarn build
      // ls -la
      // `;
      // exec(command , (err, stdout, stderr) => {
      //   console.log(`Huuuuuugo`, stdout);
      //   res.send(stdout);
      // });

      // request.get({
      //   url: WP_URL,
      //   json: true,
      //   headers: {'Content-Type': 'application/json'},
      //   timeout: 10000
      // } , (error, response, data) => {
      //   if (error) console.log('wp request error', error);
      //   // console.log('wp request', response, JSON.parse(data));
      //   console.log('wp request', response, data);
      //   res.send(wpInstructions);
      // });

      console.log(`Hugo post build-generic`, wpInstructions);
      res.send(wpInstructions);
      break;
    default:
      console.log(`Hugo post default`, wpInstructions);
      res.send(wpInstructions);
      break;
  }
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
