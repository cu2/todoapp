'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const db = monk('localhost:27017/tododb');
const collection = db.get('todo');


app.use('/static', express.static(__dirname + '/static'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/todo/', (req, res) => {
  collection.insert({
    "text": req.body.text,
    "done": false,
    "created_at": new Date(),
  }).then((doc) => {
    res.json(doc);
  });
});

app.get('/todo/', (req, res) => {
  // TODO: add filter based on req.query.done
  collection.find({}, { sort: { date: -1 } }).then((docs) => {
    res.json(docs);
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message
  });
});

app.listen(3000, () => {
  console.log('Todo app listening on port 3000!');
});
