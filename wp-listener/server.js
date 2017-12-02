'use strict';

// Dependencies
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

// App & router
const app = express();
const router = express.Router();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/hugopress', router);

router.use(function(req,res,next) {
  console.log("/" + req.method);
  next();
});

// Routes
router.get('/', (req, res) => {
  console.log(`Bare endpoint. If server functioning simply returns true boolean`);
  res.send(true);
});

router.get('/endpoints', (req, res) => {
  let routes = router.stack
    .filter((r) => r.route && r.route.path)
    .reduce((acc, curr) => {
      acc += curr.route.path + ' ';
      return acc;
    }, '');

  console.log(`GETTIN' those routes. ${routes}`);
  res.json({ 'routes': routes });
});

router.post('/build', (req, res) => {
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
