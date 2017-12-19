const express = require('express');
const bodyParser = require('body-parser');
const mc = require( `${__dirname}/controllers/messages_controller` );

require('dotenv').config();


const app = express();

const session = require('express-session');
const createInitialSession = require('./middlewere/session')
const filter = require('./middlewere/filter');


app.use( bodyParser.json() );
app.use( express.static( `${__dirname}/../public/build` ) );
app.use(session({
secret : process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10000}
}))

app.use(createInitialSession);

app.use((req, res, next) => {
    const {method} = req;
    if (method === "POST" || method === "Put") {
        filter(req, res, next);

    }
    else {
        next();
    }

});
const messagesBaseUrl = "/api/messages";
app.post( messagesBaseUrl, mc.create );
app.get( messagesBaseUrl, mc.read );
app.put( `${messagesBaseUrl}`, mc.update );
app.delete( `${messagesBaseUrl}`, mc.delete );

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );