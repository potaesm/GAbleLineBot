const request = require('request-promise');
const config = require('../../../config.json');

async function pushNextAfterNextQueueMessage(usernumber, nextafternextuserid, deptname, response) {
    try {
        await request({
            method: `POST`,
            uri: `${config.lineMessagingAPI}/push`,
            headers: config.lineHeader,
            body: JSON.stringify({
                to: nextafternextuserid,
                messages: [
                    {
                        'type': 'flex',
                        'altText': 'จำนวนคิวที่รอ 2 คิว',
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
                                        'text': 'จำนวนคิวที่รอ 2 คิว',
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

module.exports = pushNextAfterNextQueueMessage;
