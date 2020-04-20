const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/testObj', (req, res) => {
  axios({
    method: 'get',
    url:
      'https://collectionapi.metmuseum.org/public/collection/v1/objects/45734',
  })
    .then(data => {
      console.log(data);
      res.send(data.data);
    })
    .catch(err => {
      console.log('err @ server index @ get object api spec id ', err);
    });
});

// app.get('/searchArtist', (req, res) => {
//   axios({
//     method: 'get',
//     url:
//     'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Gustav Klimt'
//   });
// })

app.listen(port, () =>
  console.log(
    `hello come in am listening @ ${port} for mobile apps?? hmm maybs`,
  ),
);
