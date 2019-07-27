const request = require('request-promise');
const config = require('../../config.json');

async function replyWelcomeMessage(replyToken, response) {
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
                        text: `บริษัท G-Able ยินดีต้อนรับเข้าสู่งาน G-Able Career Day`,
                    },
                    {
                        'type': 'image',
                        'originalContentUrl': `${config.storageAPI}/wp-content/uploads/2019/07/LineBeaconSetting.jpg`,
                        'previewImageUrl': `${config.storageAPI}/wp-content/uploads/2019/07/LineBeaconSetting.jpg`,
                        'animated': false,
                    },
                    {
                        type: 'text',
                        text: `ท่านได้เปิดใช้งาน LINE Beacon เรียบร้อยแล้วใช่หรือไม่ ?`,
                        quickReply: {
                            items: [
                                {
                                    type: 'action',
                                    imageUrl: 'https://suthinanhome.files.wordpress.com/2019/06/checked-1.png',
                                    action: {
                                        type: 'message',
                                        label: 'ใช่',
                                        text: `ขั้นตอนต่อไป`,
                                    },
                                },
                                {
                                    type: 'action',
                                    imageUrl: 'https://suthinanhome.files.wordpress.com/2019/06/cancel-1.png',
                                    action: {
                                        type: 'message',
                                        label: 'ไม่ใช่',
                                        text: 'ไม่ใช่',
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

module.exports = replyWelcomeMessage;
