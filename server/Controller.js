const Met = require('./schema.js');

let save = (req, res) => {
  const metData = new Met(req.body)

  metData.save((err) => {
      if (err) {
          console.log('MET DATA.SAVE MODEL ERROR ', err)
          res.sendStatus(404)
      } else {
          res.sendStatus(200)
          console.log('suuccesful!!!');
      }
  })
}

let getData = (req, res) => {
  const metdata = Met.find({}, (err, data) => {
      if (err) {
          console.log('GETDATA BACKEND ERROR ', err);
          res.sendStatus(404);
      } else {
          console.log(data);
          res.status(200).send(data);
      }
  })
}

module.exports = {
  save,
  getData
}