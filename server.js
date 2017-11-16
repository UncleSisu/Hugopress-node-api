'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let { exec } = require('child_process');

// TODO: connect wpapi to database
// const WPAPI = require('wpapi');
// const wp = new WPAPI({ endpoint: 'http://localhost/starter/wordpress/wp-json/wp/v2/' });
// const apiPromise = WPAPI.discover('http://localhost/starter/');
//
// apiPromise.then(function(site) {
//   site.posts().then(function(posts) {
//     console.log('see them posts', posts);
//   })
// })

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
