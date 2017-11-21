'use strict';

const express = require('express');
const bodyParser = require('body-parser');
let { exec } = require('child_process');
const HugoTransmitter = require('./wares/hugoTransmitter');
const Md = require('./wares/createMarkdown');

// Constants
// TODO: cross container discussion
const PORT = 3000;
const HOST = '0.0.0.0';
// const WP_URL = `http://127.0.0.1/starter/wordpress/index.php/wp-json/wp/v2`;
const WP_URL = process.env.WP_URL;
const builderUri = 'http://172.19.0.3:3030/';

// Constructors
const hugoTransmitter = new HugoTransmitter(builderUri);
const md = new Md(WP_URL);

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  console.log(`Hello from http://${HOST}:${PORT}`);
  res.send(`Hell'o world\n`);
});

app.post('/wp-hugo', (req, res) => {
  const wpInstructions = JSON.parse(req.body.payload);

  hugoTransmitter.postToHugo(
    res,
    {
      instructions: wpInstructions,
      md: md.constructMarkdown(wpInstructions),
    }, 
    wpInstructions.text,
  );
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
