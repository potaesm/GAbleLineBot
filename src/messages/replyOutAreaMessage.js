const request = require('request-promise');
const config = require('../../config.json');

async function replyOutAreaMessage(hwid, userId, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/user/checkuserqueue/${hwid}/${userId}`,
            json: true,
        });
        const valid = `${res.valid}`;
        if (valid === `YES`) {
            const remainingqueue = `${res.remainingqueue}`;
            const deptname = `${res.deptname}`;
            return sendReplyOutOfAreaMessage(deptname, remainingqueue - 1, replyToken, response);
        }
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

async function sendReplyOutOfAreaMessage(deptname, remainingqueue, replyToken, response) {
    var text = `จำนวนคิวที่รอ ${remainingqueue} คิว`;
    if (remainingqueue === 0) {
        text = `ถึงคิวท่านแล้ว`;
    }
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
                        text: text,
                    },
                    {
                        type: 'text',
                        text: `ท่านอยู่นอกพื้นที่${deptname} ต้องการเลื่อนคิวออกไปก่อนหรือไม่ ?`,
                        quickReply: {
                            items: [
                                {
                                    type: 'action',
                                    imageUrl: 'https://suthinanhome.files.wordpress.com/2019/06/checked-1.png',
                                    action: {
                                        type: 'message',
                                        label: 'เลื่อน',
                                        text: `เลื่อนคิว${deptname}`,
                                    },
                                },
                                {
                                    type: 'action',
                                    imageUrl: 'https://suthinanhome.files.wordpress.com/2019/06/cancel-1.png',
                                    action: {
                                        type: 'message',
                                        label: 'ไม่เลื่อน',
                                        text: 'ไม่ต้องการเลื่อนคิว',
                                    },
                                },
                            ],
                        },
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

module.exports = replyOutAreaMessage;
