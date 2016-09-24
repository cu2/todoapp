```
sqlite3 todo.db

DROP TABLE IF TABLE EXIST todo;

CREATE TABLE todo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text VARCHAR(250) NOT NULL,
  done TINYINT NOT NULL DEFAULT 0
);
```



```

curl -s http://localhost:3000/todo/ | jq .
curl -s http://localhost:3000/todo/?done=0 | jq .
curl -s http://localhost:3000/todo/?done=1 | jq .


curl -s -X POST -H 'Content-Type: application/json' -d '{"text": "test with curl"}' http://localhost:3000/todo/ | jq .

curl -s http://localhost:3000/todo/4/ | jq .

curl -s -X PUT -H 'Content-Type: application/json' -d '{"text": "test with curl???", "done": 0}' http://localhost:3000/todo/4/ | jq .

curl -s -X PUT -H 'Content-Type: application/json' -d '{"text": "test with curl", "done": 1}' http://localhost:3000/todo/4/ | jq .


curl -s -X DELETE http://localhost:3000/todo/4/ | jq .




```
