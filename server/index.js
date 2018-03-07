const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const publicFolder = path.join(__dirname, 'public');

const cacheableExtensions = [
  '.png',
  '.jpeg'
];

const isCacheable = filePath => {
  const ext = path.extname(filePath);
  return cacheableExtensions.includes(ext);
};

const setHeaders = (res, filePath) => {
  if (isCacheable(filePath)) {
    res.set('Cache-Control', 'public, max-age=31536000');
  }
};

const app = express();
app.use('/', express.static(publicFolder, { setHeaders }));

app.listen(port, () => console.log(`Listening on port ${port}`));
