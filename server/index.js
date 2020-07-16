const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;
const Controller = require('./controller.js');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/metstufflol', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error tears'));
db.once('open', function() {
  console.log('leggo mongo');
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/searchArtist', (req, res) => {
  let query = req.query.artistName;

  axios({
    method: 'get',
    url: `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`,
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
      values.forEach(value => {
        results.push(value.data);
      });
      res.send(results);
    })
    .catch(err => {
      console.log('err @ server index @ get total promises', err);
    });
});

app.get('/gallery', Controller.getData);

app.post('/gallery', Controller.save);

app.listen(port, () =>
  console.log(
    `listening @ ${port}`,
  ),
);
