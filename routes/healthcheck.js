// healthcheck.routes.js: return a 2xx response when your server is healthy, else send a 5xx response

var express = require('express');
var router = express.Router();

router.get('/', async (_req, res, _next) => {
  // optional: add further things to check (e.g. connecting to dababase)
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.status(200).send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

// export router with all routes included
module.exports = router;
