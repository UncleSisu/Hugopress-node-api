'use strict';
const express = require('express');
const bodyParser = require('body-parser');
let { exec } = require('child_process');
const HugoBuilder = require('./hugoBuilder');
let builder = new HugoBuilder(exec);

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

app.get('/view', (req, res) => {
  // TODO: send back built hugo app link or end point
  res.send(`Hell'o world\n`);
})

app.post('/build-generic', (req, res) => {
  const instructions = req.body.instructions;
  // console.log('check instructions build-generic', instructions)
  let command = `
  yarn build
  ls -la
  `;
  builder.executeCommand(command);
  res.send('building');
});

app.post('/build-page', (req, res) => {
  builder.pageBuilder(req.body.mdInfo, req.body.instructions, res);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
