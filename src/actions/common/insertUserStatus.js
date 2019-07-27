const request = require('request-promise');
const config = require('../../../config.json');

async function insertUserStatus(deptname, userId, status, response) {
    try {
        await request({
            method: `GET`,
            uri: `${config.webAPI}/user/insertstatusqueue/${encodeURI(deptname)}/${userId}/${status}`,
            json: true,
        });
        return response.status(200).end();
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = insertUserStatus;
