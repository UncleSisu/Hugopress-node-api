'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HugoTransmitter = require('./wares/hugoTransmitter');
const Md = require('./wares/createMarkdown');

// Constants
const PORT = process.env.EXTERNAL_PORT;
const BUILDER_PORT = process.env.HUGO_BUILDER_PORT;
const WP_URL = process.env.WP_URL;
const HOST = '0.0.0.0';
const builderUri = `http://hugo-builder:${BUILDER_PORT}/`;

// Constructors
const hugoTransmitter = new HugoTransmitter(builderUri);
const md = new Md(WP_URL);

// App
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// TODO: cleaner routing and handling of bad requests
app.get('/', (req, res) => {
  let routes = app._router.stack
    .filter((r) => r.route && r.route.path)
    .reduce((acc, curr) => {
      acc += curr.route.path + ' ';
      return acc;
    }, '');

  console.log(`GETTIN' those routes. ${routes}`);
  res.send(JSON.stringify({ routes: routes }));
});

app.post('/wp-hugo', (req, res) => {
  const wpInstructions = JSON.parse(req.body.payload);

  hugoTransmitter.postToHugo(
    res,
    {
      instructions: wpInstructions,
      mdInfo: md.constructMarkdown(wpInstructions),
    }, 
    wpInstructions.endpoint,
  );
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
