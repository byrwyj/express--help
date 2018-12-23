const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  try {
    return await db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        password: event.password,
        truename: event.truename,
        openid: event.openid,
        schoolnum: event.schoolnum,
        roomnum: event.roomnum,
        phonenum: event.phonenum,
       
      }
    })
  } catch (e) {
    console.error(e)
  }
}

