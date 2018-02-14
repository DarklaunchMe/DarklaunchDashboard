import App from './../frontend/App';
import BodyParser from 'body-parser';
import { renderToString } from 'react-dom/server';
import * as React from 'react';
import * as express from 'express';
import { StaticRouter } from 'react-router-dom';

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('darklaunch.db');

db.serialize(function() {
    db.run(`CREATE TABLE IF NOT EXISTS codes 
    (code TEXT PRIMARY KEY, enabled INTEGER, key TEXT, value TEXT, createdby TEXT)
  `);
    db.run(`CREATE TABLE IF NOT EXISTS users 
    (uuid TEXT PRIMARY KEY, name TEXT, email TEXT, password TEXT, verified INTEGER)
  `);
});

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

const server = express();

const apiRouter = express.Router();

// API

// PUBLIC

apiRouter.get('/darklaunch_bundle', function(req: express.Request, res: express.Response) {
    db.all('SELECT * from codes', (err: Error, all: JSON) => res.json(all)); // Validate err?
});

// END PUBLIC

// SESSIONED

apiRouter.get('/show_unapprove', function(req: express.Request, res: express.Response) {
    // Returns a list of all the unapproved users
    res.sendStatus(200);
});

apiRouter.post('/add_code', function(req: express.Request, res: express.Response) {
    const q = req.body;
    const vals = [ q.code, q.enabled, q.key, q.value ]; // Sanitize probs
    db.run('INSERT OR REPLACE INTO codes VALUES(?,?,?,?)', ...vals);
    res.sendStatus(200);
});

apiRouter.post('/remove_code', function(req: express.Request, res: express.Response) {
    db.run('DELETE FROM codes WHERE code=(?)', req.body.code);
    res.sendStatus(200);
});

apiRouter.post('/login', function(req: express.Request, res: express.Response) {
    // Give user a token that ages out of the system
    // TODO
    res.sendStatus(200);
});

apiRouter.post('/register', function(req: express.Request, res: express.Response) {
    // Register a user and put them in the table but not approved
    res.sendStatus(200);
});

apiRouter.post('/approve', function(req: express.Request, res: express.Response) {
    // Circle of trust approval system
    // Given a user that's already in the system, their session key, set verified to true on the new user
    res.sendStatus(200);
});

// END SESSIONED

// END API

server.use(BodyParser.json());

server.use('/api/', apiRouter);

server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
    .get('/*', (req: express.Request, res: express.Response) => {
        const context = {};
        const markup = renderToString(
            <StaticRouter context={context} location={req.url}>
                <App />
            </StaticRouter>
        );
        res.send(
            `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Twilight</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
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
