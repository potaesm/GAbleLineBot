const request = require('request-promise');
const config = require('../../config.json');

const replyWelcomeMessage = require('../messages/replyWelcomeMessage');
const replyMessage = require('../messages/common/replyMessage');
const replySuccessMessage = require('../messages/replySuccessMessage');
const interactBeacon = require('./interactBeacon');
const registerStaff = require('./registerStaff');
const enableFirstStaffRichMenu = require('./common/enableFirstStaffRichMenu');
const enableSecondStaffRichMenu = require('./common/enableSecondStaffRichMenu');
const joinTheQueue = require('./joinTheQueue');
const getQueueList = require('./getQueueList');
const postponeTheQueue = require('./postponeTheQueue');
const callNextQueue = require('./callNextQueue');

const deregisterStaff = require('./deregisterStaff');

async function handleEvent(type, message, beacon, userId, replyToken, response) {
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
                            case 'ไม่ใช่': {
                                return replyMessage(`โปรดดูรายละเอียดขั้นตอนการเปิดใช้งาน Line Beacon ในรูปภาพที่แนบมา แล้วทำการปิด-เปิด Line Application อีกครั้ง`, replyToken, response);
                            }
                            case 'ขั้นตอนต่อไป': {
                                return replySuccessMessage(replyToken, response);
                            }
                            case 'DEREG': {
                                return deregisterStaff(userId, replyToken, response);
                            }
                            case 'ข้ามคิว': {
                                return callNextQueue(`skip`, userId, replyToken, response);
                            }
                            case 'จบการสัมภาษณ์': {
                                return enableFirstStaffRichMenu(userId, response);
                            }
                            case 'เรียกคิวถัดไป': {
                                enableSecondStaffRichMenu(userId, response);
                                return callNextQueue(`next`, userId, replyToken, response);
                            }
                            case 'รายการคิว': {
                                return getQueueList(userId, replyToken, response);
                            }
                            case 'ไม่ต้องการเลื่อนคิว': {
                                return replyMessage(`กรุณาเตรียมตัวเข้าสัมภาษณ์`, replyToken, response);
                            }
                            default: {
                                if (message.text.substring(0, 15) === `ยืนยันการจองคิว` && deptNameArray.includes(message.text.substring(15))) {
                                    return joinTheQueue(message.text.substring(15), userId, replyToken, response);
                                }
                                if (message.text.substring(0, 9) === `เลื่อนคิว` && deptNameArray.includes(message.text.substring(9))) {
                                    return postponeTheQueue(message.text.substring(9), userId, replyToken, response);
                                }
                                return registerStaff(userId, message.text, replyToken, response);
                            }
                        }
                    }
                    default: {
                        break;
                    }
                }
            }
            case 'follow': {
                return replyWelcomeMessage(replyToken, response);
            }
            case 'beacon': {
                if (beacon.type === `enter`) {
                    return interactBeacon(beacon.hwid, userId, 1, replyToken, response);
                } else if (beacon.type === `leave`) {
                    return interactBeacon(beacon.hwid, userId, 0, replyToken, response);
                }
            }
            default: {
                break;
            }
        }
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = handleEvent;
