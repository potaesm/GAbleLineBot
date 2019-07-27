const request = require('request-promise');
const config = require('../../config.json');

async function replyStaffWelcomeMessage(userId, deptname, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `https://api.line.me/v2/bot/profile/${userId}`,
            headers: config.lineHeader,
            json: true,
        });
        const name = `${res.displayName}`;
        return request({
            method: `POST`,
            uri: `${config.lineMessagingAPI}/reply`,
            headers: config.lineHeader,
            body: JSON.stringify({
                replyToken: replyToken,
                messages: [
                    {
                        type: `text`,
                        text: `ยินดีต้อนรับคุณ ${name} เข้าสู่${deptname}`,
                    },
                    {
                        type: `text`,
                        text: `วิธีการใช้งาน : กดดูคิวเพื่อดูรายการคิว และเรียกคิวถัดไปเมื่อต้องการเรียกผู้เข้าคิวท่านถัดไป`,
                    },
                ],
            }),
        });
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = replyStaffWelcomeMessage;
