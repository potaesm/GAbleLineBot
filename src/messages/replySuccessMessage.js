const request = require('request-promise');
const config = require('../../config.json');

async function replySuccessMessage(replyToken, response) {
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
                        text: `การลงทะเบียนสำเร็จ กรุณาปิด-เปิด Line Application อีกครั้ง เพื่อการใช้งานที่สมบูรณ์`,
                    },
                    {
                        'type': 'flex',
                        'altText': 'G-Able Career Day 2019',
                        'contents': {
                            'type': 'bubble',
                            'hero': {
                                'type': 'image',
                                'url': 'https://www.g-able.com/engine/wp-content/uploads/2019/06/G-Able-Poster-by-MKT_Last-Edit-11-6-19.jpg',
                                'size': 'full',
                                'aspectRatio': '16:9',
                                'aspectMode': 'cover',
                                'action': {
                                    'type': 'uri',
                                    'label': 'Action',
                                    'uri': 'https://www.g-able.com/events/g-able-career-day-2019/',
                                },
                            },
                            'body': {
                                'type': 'box',
                                'layout': 'horizontal',
                                'spacing': 'md',
                                'contents': [
                                    {
                                        'type': 'box',
                                        'layout': 'vertical',
                                        'flex': 1,
                                        'contents': [
                                            {
                                                'type': 'image',
                                                'url': 'https://storage.linequeuegable.dev.nextliving.co/wp-content/uploads/2019/07/group.png',
                                                'gravity': 'bottom',
                                                'size': 'xs',
                                                'aspectMode': 'cover',
                                            },
                                            {
                                                'type': 'image',
                                                'url': 'https://storage.linequeuegable.dev.nextliving.co/wp-content/uploads/2019/07/location.png',
                                                'margin': 'md',
                                                'size': 'xs',
                                                'aspectMode': 'cover',
                                            },
                                        ],
                                    },
                                    {
                                        'type': 'box',
                                        'layout': 'vertical',
                                        'flex': 2,
                                        'contents': [
                                            {
                                                'type': 'text',
                                                'text': 'G-Able Career Day 2019',
                                                'flex': 1,
                                                'size': 'xs',
                                                'gravity': 'top',
                                            },
                                            {
                                                'type': 'separator',
                                            },
                                            {
                                                'type': 'text',
                                                'text': 'มิติใหม่ของการหางาน',
                                                'flex': 2,
                                                'size': 'xs',
                                                'gravity': 'center',
                                            },
                                            {
                                                'type': 'separator',
                                            },
                                            {
                                                'type': 'text',
                                                'text': 'Empire Tower (ชั้น M)',
                                                'flex': 2,
                                                'size': 'xs',
                                                'gravity': 'center',
                                            },
                                            {
                                                'type': 'separator',
                                            },
                                            {
                                                'type': 'text',
                                                'text': '9:00 am - 4:30 pm',
                                                'flex': 1,
                                                'size': 'xs',
                                                'gravity': 'bottom',
                                            },
                                        ],
                                    },
                                ],
                            },
                            'footer': {
                                'type': 'box',
                                'layout': 'horizontal',
                                'contents': [
                                    {
                                        'type': 'button',
                                        'action': {
                                            'type': 'uri',
                                            'label': 'เพิ่มเติม',
                                            'uri': 'https://www.g-able.com/events/g-able-career-day-2019/',
                                        },
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

module.exports = replySuccessMessage;
