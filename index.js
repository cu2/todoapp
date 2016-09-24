'use strict';

var express = require('express');
var bodyparser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var db = monk('localhost:27017/tododb');
var collection = db.get('todo');


app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



app.post('/todo/', (req, res) => {
  collection.insert({
    "text": req.body.text,
    "done": false,
  }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      res.json(doc);
    }
  });
});

app.get('/todo/', (req, res) => {
  // TODO: add filter based on req.query.done
  collection.find({}, {}, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      res.json(docs);
    }
  });
});



app.listen(3000, () => {
  console.log('Todo app listening on port 3000!');
});
