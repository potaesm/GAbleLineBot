const request = require('request-promise');
const replyMessage = require('../messages/common/replyMessage');
const config = require('../../config.json');

async function deregisterStaff(userId, replyToken, response) {
    try {
        const res = await request({
            method: `GET`,
            uri: `${config.webAPI}/officer/logoutofficertable/${userId}`,
            json: true,
        });
        const status = `${res.status}`;
        if (status === `success`) {
            return disableStaffRichMenu(userId, replyToken, response);
        }
        return replyMessage(`คุณไม่ได้เป็น Staff อยู่แล้ว`, replyToken, response);
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

async function disableStaffRichMenu(userId, replyToken, response) {
    try {
        await request({
            method: `DELETE`,
            uri: `https://api.line.me/v2/bot/user/${userId}/richmenu`,
            headers: config.lineHeader,
        });
        return replyMessage(`คุณได้ยกเลิกการเป็น Staff แล้ว!`, replyToken, response);
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

/*
const enableUserRichMenu = (userId, replyToken, response) => {
  return request({
    method: `GET`,
    uri: `https://api.line.me/v2/bot/richmenu/list`,
    headers: config.lineHeader,
    json: true,
  }).then((res) => {
    const richMenuId = `${res.richmenus[1].richMenuId}`;
    replyMessage(`คุณได้ยกเลิกการเป็น Staff แล้ว!`, replyToken, response);
    return request({
      method: `POST`,
      uri: `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
      headers: config.lineHeader,
    });
  }).catch((error) => {
    console.error(error);
    return response.status(500).end();
  });
};
*/

module.exports = deregisterStaff;
