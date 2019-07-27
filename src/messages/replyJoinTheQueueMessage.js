const request = require('request-promise');
const config = require('../../config.json');

async function replyJoinTheQueueMessage(deptname, replyToken, response) {
    try {
        await request({
            method: `POST`,
            uri: `${config.lineMessagingAPI}/reply`,
            headers: config.lineHeader,
            body: JSON.stringify({
                replyToken: replyToken,
                messages: [
                    {
                        'type': 'flex',
                        'altText': `จองคิว${deptname}`,
                        'contents': {
                            'type': 'bubble',
                            'direction': 'ltr',
                            'header': {
                                'type': 'box',
                                'layout': 'vertical',
                                'contents': [
                                    {
                                        'type': 'text',
                                        'text': `${deptname}`,
                                        'align': 'center',
                                        'weight': 'bold',
                                    },
                                ],
                            },
                            'hero': {
                                'type': 'image',
                                'url': `https://storage.linequeuegable.dev.nextliving.co/wp-content/uploads/2019/07/tickets.png`,
                                'size': 'full',
                                'aspectRatio': '1:1',
                                'aspectMode': 'cover',
                            },
                            'footer': {
                                'type': 'box',
                                'layout': 'horizontal',
                                'contents': [
                                    {
                                        'type': 'button',
                                        'action': {
                                            'type': 'message',
                                            'label': 'จองคิว',
                                            'text': `ยืนยันการจองคิว${deptname}`,
                                        },
                                        'style': 'primary',
                                    },
                                ],
                            },
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

module.exports = replyJoinTheQueueMessage;
