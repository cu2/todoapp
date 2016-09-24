'use strict';

const express = require('express');
const bodyparser = require('body-parser');
const mongo = require('mongodb');
const monk = require('monk');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

const db = monk(process.env.MONGODB_URL || 'localhost:27017/tododb');
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

app.get('/todo/:id/?', function (req, res) {
  collection.findOne({_id: req.params.id}).then((doc) => {
    res.json(doc);
  });
});

app.put('/todo/:id/?', function (req, res) {
  let updateObj = {};
  if (req.body.text !== undefined) {
    updateObj.text = req.body.text;
  }
  if (req.body.done !== undefined) {
    updateObj.done = req.body.done;
  }
  if (Object.keys(updateObj).length > 0) {
    collection.findOneAndUpdate({_id: req.params.id}, {$set: updateObj}).then((doc) => {
      res.json(doc);
    });
  } else {
    res.status(400).json({
      error: 'No field specified to update.'
    });
  }
});

app.delete('/todo/:id/?', function (req, res) {
  collection.findOneAndDelete({_id: req.params.id}).then((doc) => {
    res.json(doc);
  });
});

app.get('/todo/', (req, res) => {
  let filterObj = {};
  if (req.query.done !== undefined) {
    filterObj = { done: (req.query.done === '1' || req.query.done === 'true') };
  }
  collection.find(filterObj, { sort: { date: -1 } }).then((docs) => {
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
