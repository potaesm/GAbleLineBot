const request = require('request-promise');
const config = require('../../../config.json');

async function enableSecondStaffRichMenu(userId, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `https://api.line.me/v2/bot/richmenu/list`,
            headers: config.lineHeader,
            json: true,
        });
        const richMenuId = `${res.richmenus[1].richMenuId}`;
        return request({
            method: `POST`,
            uri: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
            headers: config.lineHeader,
        });
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = enableSecondStaffRichMenu;
