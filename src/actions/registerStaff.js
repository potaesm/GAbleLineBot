const request = require('request-promise');
const replyMessage = require('../messages/common/replyMessage');
const replyStaffWelcomeMessage = require('../messages/replyWelcomeMessage');
const enableFirstStaffRichMenu = require('./common/enableFirstStaffRichMenu');

async function registerStaff(userId, account, replyToken, response) {
  try {
        const res = await request({
            method: `GET`,
            uri: `https://webapi.linequeuegable.dev.nextliving.co/officer/accountstaff/${account}`,
            json: true,
        });
        const status = `${res.status}`;
        if (status === `valid`) {
            const staffHwid = `${res.hwid}`;
            return registerStaffToDB(userId, staffHwid, replyToken, response);
        }
        else {
            return response.status(200).end();
        }
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

async function registerStaffToDB(userId, staffHwid, replyToken, response) {
  try {
        const res = await request({
            method: `GET`,
            uri: `https://webapi.linequeuegable.dev.nextliving.co/officer/registerofficer/${userId}/${staffHwid}`,
            json: true,
        });
        const tied = `${res.tied}`;
        if (tied === `NO`) {
            const hwvalid = `${res.hwvalid}`;
            if (hwvalid === `YES`) {
                const hwduplicate = `${res.hwduplicate}`;
                if (hwduplicate === `NO`) {
                    const deptname = `${res.deptname}`;
                    enableFirstStaffRichMenu(userId, response);
                    return replyStaffWelcomeMessage(userId, deptname, replyToken, response);
                }
                else {
                    return replyMessage(`ไม่สามารถลงทะเบียนได้ เนื่องจากมี Staff ประจำแผนกอยู่แล้ว`, replyToken, response);
                }
            }
            else {
                return replyMessage(`ไม่มีอุปกรณ์ HWID: ${staffHwid} ในระบบ`, replyToken, response);
            }
        }
        else {
            const deptname_1 = `${res.deptname}`;
            enableFirstStaffRichMenu(userId, response);
            return replyMessage(`คุณเป็น Staff ประจำ${deptname_1} อยู่แล้ว`, replyToken, response);
        }
    }
    catch (error) {
        console.error(error);
        return response.status(500).end();
    }
};

module.exports = registerStaff;
