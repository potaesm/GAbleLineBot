const request = require('request-promise');
const hex = require('string-hex');
const config = require('../../config.json');
const replyMessage = require('../messages/common/replyMessage');
const replyNormalQueue = require('../messages/common/replyNormalQueue');
const replyYouAreNextQueue = require('../messages/replyYouAreNextQueue');

async function joinTheQueue(deptname, userId, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/user/insertqueuenumber/${encodeURI(deptname)}/${userId}`,
            json: true,
        });
        if (res.duplicate === `NO`) {
            const remaining = `${res.success.remaining}`;
            const usernumber = `${res.success.usernumber}`;
            insertUserDisplayName(userId, response);
            if (remaining <= 1) {
                return replyYouAreNextQueue(usernumber, deptname, replyToken, response);
            }
            return replyNormalQueue(usernumber, deptname, remaining - 1, replyToken, response);
        }
        return replyMessage(`ท่านได้ทำการจองคิวไปแล้ว กรุณารอการเรียกคิว`, replyToken, response);
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

function insertUserDisplayName(userId, response) {
    request({
        method: `GET`,
        uri: `https://api.line.me/v2/bot/profile/${userId}`,
        headers: config.lineHeader,
        json: true,
    }).then((res) => {
        const name = `${res.displayName}`;
        const hexname = hex(name);
        return request({
            method: `GET`,
            uri: `${config.webAPI}/officer/insertnameuser/${userId}/${hexname}`,
            json: true,
        });
    }).catch((error) => {
        console.error(error);
        return response.status(500).end();
    });
};

module.exports = joinTheQueue;
