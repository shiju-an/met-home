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
  console.log(query);

  axios({
    method: 'get',
    url: `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`
  })
    .then(data => {
      console.log(data.data, ' search artist server data');
      res.send(data.data);
    })
    .catch(err => {
      console.log('err @ server index @ get object search api ', err);
    });
});

app.get('/getImages', (req, res) => {
  // console.log(req.query.id);
  const promises = [];
  // console.log(req.query.id.length, ' query id length')

  for (let i = 0; i < req.query.id.length; i++) {
    let id = req.query.id[i];
    // console.log(id);
    let promise = axios({
      method: 'get',
      url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
    })
    // console.log(promise.length);
    promises.push(promise);
      // .then(data => {
      //   console.log(data, ' get images data on server side');
      //   res.send(data);
      // })
      // .catch(err => {
      //   console.log('err @ server index @ get object search api ', err);
      // });
  }
  Promise.all(promises)
    .then(function(values) {
    console.log(values, ' this is working');
  })
});

app.listen(port, () =>
  console.log(
    `hello come in am listening @ ${port} for mobile apps?? hmm maybs`,
  ),
);
