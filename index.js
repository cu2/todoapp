var express = require('express');
var bodyparser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

var db = new sqlite3.Database('todo.db');


app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});



app.post('/todo/', function (req, res) {
  db.run('INSERT INTO todo (text) VALUES(?)', req.body.text, function(err) {
    if (err !== null) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      db.get('SELECT * FROM todo WHERE id = ?', this.lastID, function(err, row) {
        if (err !== null) {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        } else {
          res.json(row);
        }
      });
    }
  });
});

app.get('/todo/:id/?', function (req, res) {
  db.get('SELECT * FROM todo WHERE id = ?', req.params.id, function(err, row) {
    if (err !== null) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      res.json(row);
    }
  });
});

app.put('/todo/:id/?', function (req, res) {
  db.run('UPDATE todo SET text = ?, done = ? WHERE id = ?', req.body.text, req.body.done, req.params.id, function(err) {
    if (err !== null) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      db.get('SELECT * FROM todo WHERE id = ?', req.params.id, function(err, row) {
        if (err !== null) {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        } else {
          res.json(row);
        }
      });
    }
  });
});

app.delete('/todo/:id/?', function (req, res) {
  db.run('DELETE FROM todo WHERE id = ?', req.params.id, function(err) {
    if (err !== null) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      res.json({
        deleted: this.changes,
      });
    }
  });
});

app.get('/todo/', function (req, res) {
  let sqlCommand = 'SELECT * FROM todo';
  let sqlParams = [];
  if (req.query.done !== undefined) {
    sqlCommand += ' WHERE done = ?';
    sqlParams.push(req.query.done);
  }
  db.all(sqlCommand, sqlParams, function(err, rows) {
    if (err !== null) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      res.json(rows);
    }
  });
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
