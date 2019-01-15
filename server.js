const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');
const compression = require('compression');
const port = 80;
app.use(history());
app.use(compression());
app.get('*', (req, res) => {
  return res.sendFile(`${__dirname}/dist/${req.path}`)
});
app.listen(port, () => console.info(`HTTP server up on port ${port}`));
