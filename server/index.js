const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `${__dirname}/controllers/messages_controller` );
require('dotenv').config();
const app = express();
const session = require('express-session');
const createInitialSession = require('./middlewere/session')

app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );
app.use(session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10000}
}))

app.use(createInitialSession);
const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );