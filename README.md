```
sqlite3 todo.db

DROP TABLE todo;

CREATE TABLE todo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text VARCHAR(250) NOT NULL,
  done TINYINT NOT NULL DEFAULT 0
);
```

https://github.com/mapbox/node-sqlite3/wiki/API
