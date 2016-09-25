# Todo app

- frontend: jQuery
- backend: NodeJS + Express + MongoDB
- infra: mlab.com + zeit.co/now



## Setup

```
npm install
```



## Run locally

```
npm start
```



## Deploy to production

Set production DB config:

```
now secret add mongodb-url '<USER>:<PW>@<HOST>:<PORT>/<DBNAME>'
```

and deploy:

```
now -e MONGODB_URL=@mongodb-url
```
