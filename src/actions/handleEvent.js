const request = require('request-promise');
const config = require('../../config.json');

const replyMessage = require('../messages/common/replyMessage');
const replySuccessMessage = require('../messages/replySuccessMessage');

const deregisterStaff = require('./deregisterStaff');

async function handleEvent(type, message, userId, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/officer/deptall`,
            json: true,
        });
        const status = `${res.status}`;
        var deptNameArray = ``;
        if (status === `valid`) {
            deptNameArray = `${res.deptname}`;
        }
        switch (type) {
            case 'message': {
                switch (message.type) {
                    case 'text': {
                        switch (message.text) {
                            case 'ขั้นตอนต่อไป': {
                                return replySuccessMessage(replyToken, response);
                            }
                            case 'DEREG': {
                                return deregisterStaff(userId, replyToken, response);
                            }
                            case 'ข้ามคิว': {
                                break;
                            }
                            case 'จบการสัมภาษณ์': {
                                break;
                            }
                            case 'เรียกคิวถัดไป': {
                                break;
                            }
                            case 'รายการคิว': {
                                break;
                            }
                            case 'ไม่ต้องการเลื่อนคิว': {
                                break;
                            }
                            default: {
                                registerStaff(userId, account, replyToken, response);
                                if (message.text.substring(0, 15) === `ยืนยันการจองคิว` && deptNameArray.includes(message.text.substring(15))) {
                                }
                                if (message.text.substring(0, 9) === `เลื่อนคิว` && deptNameArray.includes(message.text.substring(9))) {
                                }
                                break;
                            }
                        }
                    }
                    default: {
                        break;
                    }
                }
            }
            case 'follow': {
                break;
            }
            case 'beacon': {
            }
            default: {
                break;
            }
        }
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = handleEvent;
