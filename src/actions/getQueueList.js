const request = require('request-promise');
const config = require('../../config.json');
const replyMessage = require('../messages/common/replyMessage');

async function getQueueList(userId, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/officer/checkdetailofficer/${userId}`,
            json: true,
        });
        const valid = `${res.valid}`;
        if (valid === `YES`) {
            const hwid = `${res.hwid}`;
            return replyMessage(`${config.webAPI}/officer/listque/${hwid}`, replyToken, response);
        }
        return replyMessage(`คุณไม่มีสิทธิ์เข้าถึง`, replyToken, response);
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = getQueueList;
