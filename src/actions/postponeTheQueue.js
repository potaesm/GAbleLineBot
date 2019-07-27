const request = require('request-promise');
const config = require('../../config.json');
const replyNormalQueue = require('../messages/common/replyNormalQueue');
const insertUserStatus = require('./common/insertUserStatus');

async function postponeTheQueue(deptname, userId, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/user/movequeue/${encodeURI(deptname)}/${userId}`,
            json: true,
        });
        const valid = `${res.valid}`;
        if (valid === `YES`) {
            const usernumber = `${res.usernumber}`;
            const remainingqueue = `${res.remainingqueue}`;
            replyNormalQueue(usernumber, deptname, remainingqueue, replyToken, response);
            return insertUserStatus(deptname, userId, 4, response);
        }
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = postponeTheQueue;
