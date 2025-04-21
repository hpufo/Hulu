const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

app.use(cors());

app.use('/proxy', (req, res, next) => {
  const target = req.query.target;
  if (!target) {
    return res.status(400).send('Missing "target" query parameter');
  }

  const proxy = createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '',
    },
  });

  proxy(req, res, next);
});

app.get('/', (req, res) => {
  axios.get(req.query.target)
    .then((response) => {
      res.send(response.data);
    })
    .catch(e => console.log(e));
});

app.listen(PORT, () => {
  console.log(`CORS Proxy Server is running on http://localhost:${PORT}`);
});
