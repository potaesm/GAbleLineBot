const request = require('request-promise');
const config = require('../../../config.json');

async function replyMessage(messageText, replyToken, response) {
    try {
        await request({
            method: `POST`,
            uri: `${config.lineMessagingAPI}/reply`,
            headers: config.lineHeader,
            body: JSON.stringify({
                replyToken: replyToken,
                messages: [
                    {
                        type: `text`,
                        text: messageText,
                    },
                ],
            }),
        });
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
}

module.exports = replyMessage;
