const request = require('request-promise');
const config = require('../../config.json');
const replyMessage = require('../messages/common/replyMessage');
const replyNextQueueMessage = require('../messages/next/replyNextQueueMessage');
const pushPresentQueueMessage = require('../messages/next/pushPresentQueueMessage');
const pushNextQueueMessage = require('../messages/next/pushNextQueueMessage');
const pushAfterNextQueueMessage = require('../messages/next/pushAfterNextQueueMessage');
const pushNextAfterNextQueueMessage = require('../messages/next/pushNextAfterNextQueueMessage');

async function callNextQueue(type, userId, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/officer/checkofficer/${userId}`,
            json: true,
        });
        const status = `${res.status}`;
        if (status === `success`) {
            const valid = `${res.valid}`;
            const hwid = `${res.hwid}`;
            if (valid === `YES`) {
                return requestnNextQueue(type, hwid, replyToken, response);
            }
        }
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

async function requestnNextQueue(type, hwid, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/officer/deptnextqueue/${hwid}`,
            json: true,
        });
        const valid = `${res.valid}`;
        if (valid === `YES`) {
            const deptname = `${res.deptname}`;
            const presentuserid = `${res.present.userid}`;
            const presentusernumber = `${res.present.usernumber}`;
            const nextuserid = `${res.next.userid}`;
            const nextusernumber = `${res.next.usernumber}`;
            const afternextuserid = `${res.afternext.userid}`;
            const afternextusernumber = `${res.afternext.usernumber}`;
            const nextafternextuserid = `${res.nextafternext.userid}`;
            const nextafternextusernumber = `${res.nextafternext.usernumber}`;
            pushPresentQueueMessage(type, presentusernumber, presentuserid, deptname, response);
            pushNextQueueMessage(nextusernumber, nextuserid, deptname, response);
            pushAfterNextQueueMessage(afternextusernumber, afternextuserid, deptname, response);
            pushNextAfterNextQueueMessage(nextafternextusernumber, nextafternextuserid, deptname, response);
            return replyNextQueueMessage(`${nextuserid}`, replyToken, response);
        }
        return replyMessage(`ไม่มีคิวแล้ว`, replyToken, response);
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = callNextQueue;
