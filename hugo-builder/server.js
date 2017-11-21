'use strict';
const express = require('express');
const bodyParser = require('body-parser');
let { exec } = require('child_process');
const Executer = require('./abstractExecuter');
let executer = new Executer(exec);

// Constants
// TODO: cross container discussion
const PORT = process.env.EXTERNAL_PORT;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(`Hello from http://${HOST}:${PORT}`);
  res.send(`Hell'o world\n`);
});

app.post('/build-generic', (req, res) => {
  const instructions = req.body.instructions;
  // console.log('check instructions build-generic', instructions)
  let command = `
  yarn build
  ls -la
  `;
  executer.executeCommand(command);
  res.send('building');
});

app.post('/build-page', (req, res) => {
  const markdown = req.body.md;
  // TODO: do fs.stat stuff, create directory if needed, then create md file
  // after which, trigger a build
  // fs.stat(`${__dirname}/src/content/${instructions.content.post_name}`, )
  console.log('check markdown', markdown)
  res.send('markdown');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
