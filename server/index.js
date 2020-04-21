const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/testObj', (req, res) => {
//   axios({
//     method: 'get',
//     url:
//       'https://collectionapi.metmuseum.org/public/collection/v1/objects/45734',
//   })
//     .then(data => {
//       res.send(data.data);
//     })
//     .catch(err => {
//       console.log('err @ server index @ get object api spec id ', err);
//     });
// });

app.get('/searchArtist', (req, res) => {
  let query = req.query.artistName;

  axios({
    method: 'get',
    url: `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`
  })
    .then(data => {
      res.send(data.data);
    })
    .catch(err => {
      console.log('err @ server index @ get object search api ', err);
    });
});

app.get('/getImages', (req, res) => {
  const promises = [];
  const results = [];

  for (let i = 0; i < req.query.id.length; i++) {
    let id = req.query.id[i];
    let promise = axios({
      method: 'get',
      url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    });
    promises.push(promise);
  }
  Promise.all(promises)
    .then(function (values) {
      // console.log(values[0].data, ' this is working');
      values.forEach(value => {
        results.push(value.data);
      });
      // console.log(results, ' results array with only data? :/');
      res.send(results);
    })
    .catch(err => {
      console.log('err @ server index @ get total promises wat ', err);
    });
});

app.listen(port, () =>
  console.log(
    `hello come in am listening @ ${port} for mobile apps?? hmm maybs`,
  ),
);
