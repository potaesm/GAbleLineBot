const request = require('request-promise');
const config = require('../../../config.json');
const replyMessage = require('../common/replyMessage');

function replyNextQueueMessage(nextuserid, replyToken, response) {
    request({
        method: `GET`,
        uri: `https://api.line.me/v2/bot/profile/${nextuserid}`,
        headers: config.lineHeader,
        json: true,
    }).then((res) => {
        const name = `${res.displayName}`;
        return replyMessage(`คิวถัดไป คุณ ${name}`, replyToken, response);
    }).catch((error) => {
        console.error(error);
        return response.status(500).end();
    });
};

module.exports = replyNextQueueMessage;
