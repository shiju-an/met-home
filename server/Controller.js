const Met = require('./schema.js');

let save = (req, res) => {
  console.log(req.body);

  const metstufflol = new Met(req.body);

  metstufflol.save(err => {
    if (err) {
      console.log('MET DATA.SAVE MODEL ERROR ', err);
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
      console.log('suuccesful!');
    }
  });
};

let getData = (req, res) => {
  const metstufflol = Met.find({}, (err, data) => {
    if (err) {
      console.log('GETDATA BACKEND ERROR ', err);
      res.sendStatus(404);
    } else {
      // console.log(data, ' mongo data');
      res.status(200).send(data);
    }
  });
};

module.exports = {
  save,
  getData,
};
