const request = require('request-promise');
const config = require('../../config.json');
const replyJoinTheQueueMessage = require('../messages/replyJoinTheQueueMessage');
const replyOutAreaMessage = require('../messages/replyOutAreaMessage');

async function interactBeacon(hwid, userId, statusid, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/user/inserttempbeacon/${hwid}/${userId}/${statusid}`,
            json: true,
        });
        const status = `${res.status}`;
        const deptname = `${res.data.deptname}`;
        if (status === `success`) {
            insertTimestamp(hwid, userId, statusid, response);
            if (statusid === 1) {
                return replyJoinTheQueueMessage(deptname, replyToken, response);
            }
            else if (statusid === 0) {
                return replyOutAreaMessage(hwid, userId, replyToken, response);
            }
            return response.status(200).end();
        }
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

async function insertTimestamp(hwid, userId, statusid, response) {
    if (statusid === 1) {
        global.timestampstatus = `in`;
    } else {
        global.timestampstatus = `out`;
    }
    try {
        await request({
            method: `GET`,
            uri: `${config.webAPI}/user/beacon/${global.timestampstatus}/${hwid}/${userId}`,
            json: true,
        });
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = interactBeacon;
