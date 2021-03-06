const request = require('request-promise');
const config = require('../../config.json');

async function replyYouAreNextQueue(usernumber, deptname, replyToken, response) {
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
                        'altText': `สัมภาษณ์งาน${deptname} ถึงคิวท่านแล้ว`,
                        'contents': {
                            'type': 'bubble',
                            'direction': 'ltr',
                            'body': {
                                'type': 'box',
                                'layout': 'vertical',
                                'contents': [
                                    {
                                        'type': 'text',
                                        'text': 'คิวของท่าน',
                                        'flex': 1,
                                        'align': 'start',
                                        'color': '#878787',
                                    },
                                    {
                                        'type': 'text',
                                        'text': `${usernumber}`,
                                        'size': '4xl',
                                        'color': '#FF7D00',
                                    },
                                    {
                                        'type': 'text',
                                        'text': 'รายละเอียด',
                                        'color': '#878787',
                                    },
                                    {
                                        'type': 'text',
                                        'text': `สัมภาษณ์งาน${deptname}`,
                                    },
                                    {
                                        'type': 'separator',
                                    },
                                    {
                                        'type': 'text',
                                        'text': 'ถึงคิวท่านแล้ว',
                                        'margin': 'xl',
                                        'size': 'xl',
                                        'align': 'center',
                                        'weight': 'bold',
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

module.exports = replyYouAreNextQueue;
