const scrape = require('./scrapers');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.get('/search/:provider/:title', (req, res) => {
  const { provider, title } = req.params;

  scrape[provider](title)
    .then(found => res.send(found))
    .catch(err => console.log(err));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
