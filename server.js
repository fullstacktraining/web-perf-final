// const express = require('express');
// const app = express();
// const history = require('connect-history-api-fallback');
// const compression = require('compression');
// const port = 80;
// app.use(compression());
// app.use(express.static(`${__dirname}/dist`));
// // app.use(history({
// //   verbose: true,
// //   disableDotRule: true
// // }));
// // app.use(express.static(`${__dirname}/dist`));
// app.use((req, res, next) => {
//   if (!req.originalUrl.includes('/dist/', 0)) {
//     res.sendFile(`${__dirname}/dist/index.html`);
//   } else {
//     next();
//   }
// });

// app.get('/', (req, res) => {
//   return res.render(`${__dirname}/dist/index.html`)
// });

// app.listen(port, () => console.info(`HTTP server up on port ${port}`));


const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');
const port = 80;

app.use(history());
app.use(express.static('dist'));

app.listen(port, () => console.info(`HTTP server up on port ${port}`));