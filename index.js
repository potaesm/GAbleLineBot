const config = require('./config');
const line = require('@line/bot-sdk');
const express = require('express');
const events = require('events');

const handleEvent = require('./src/actions/handleEvent');

var emitter = new events.EventEmitter();
const app = express();

const port = config.port;
const webAPI = config.webAPI;

app.get('/', function (req, response) {
    response.send('G-ABLE LINE API V1.3');
});

app.post('/webhook', line.middleware(config), (request, response) => {

    if (!Array.isArray(request.body.events)) {
        return response.status(500).end();
    }
    
    Promise.all(request.body.events.map((events) => {

        console.log('events', events);

        if (events.replyToken === '00000000000000000000000000000000' ||
            events.replyToken === 'ffffffffffffffffffffffffffffffff') {
            return null;
        }

        const type = events.type;
        const message = events.message;
        const userId = events.source.userId;
        const replyToken = events.replyToken;
        
        handleEvent(type, message, userId, replyToken, response);

    })).then(() => {
        response.status(200).end();
    }).catch((error) => {
        console.error(error);
        response.status(500).end();
    });
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
