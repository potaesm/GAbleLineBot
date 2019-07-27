const request = require('request-promise');
const config = require('../../../config.json');
const insertUserStatus = require('../../actions/common/insertUserStatus');

async function pushPresentQueueMessage(type, presentusernumber, presentuserid, deptname, response) {
    var firstMsg = ``;
    var secondMsg = ``;
    if (type === `skip`) {
        insertUserStatus(deptname, presentuserid, 5, response);
        firstMsg = `ขออภัย ท่านไม่ได้มาสัมภาษณ์ภายในเวลา`;
        secondMsg = `หากท่านต้องการเข้าสัมภาษณ์ใน${deptname} กรุณาทำรายการอีกครั้ง`;
    }
    if (type === `next`) {
        insertUserStatus(deptname, presentuserid, 3, response);
        firstMsg = `การสัมภาษณ์จบแล้ว`;
        secondMsg = `ขอบคุณที่ให้ความสนใจ${deptname} ในงาน G-Able Career Day 2019`;
    }
    try {
        await request({
            method: `POST`,
            uri: `${config.lineMessagingAPI}/push`,
            headers: config.lineHeader,
            body: JSON.stringify({
                to: presentuserid,
                messages: [
                    {
                        type: `text`,
                        text: firstMsg,
                    },
                    {
                        type: `text`,
                        text: secondMsg,
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
};

module.exports = pushPresentQueueMessage;
