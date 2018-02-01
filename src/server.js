import App from './App';
import BodyParser from 'body-parser';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('darklaunch.db');

db.serialize(function() {
  // db.run("DROP TABLE codes")
  db.run("CREATE TABLE IF NOT EXISTS codes (code TEXT PRIMARY KEY, enabled INTEGER, key TEXT, value TEXT)");
});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

const apiRouter = express.Router();

apiRouter.get('/darklaunch_bundle', function(req, res) {
    db.all("SELECT * from codes", (err, all) => res.json(all)); // Validate err?
});

apiRouter.post('/addCode', function(req, res) {
  const q = req.body;  
  const vals = [q['code'], q['enabled'], q['key'], q['value']]; // Sanitize probs
  db.run("INSERT OR REPLACE INTO codes VALUES(?,?,?,?)", ...vals);
  res.sendStatus(200);
});

apiRouter.post('/removeCode', function(req, res) {
  db.run("DELETE FROM codes WHERE code=(?)", req.body['code']);
  res.sendStatus(200);
});

server.use(BodyParser.json());

server.use('/api/', apiRouter);

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const markup = renderToString(<App />);
    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
         ${process.env.NODE_ENV === 'production'
           ? `<script src="${assets.client.js}" defer></script>`
           : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </head>
    <body>
        <div id="root">${markup}</div>
    </body>
</html>`
    );
  });


export default server;
