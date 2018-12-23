const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async(event, context) => {
  try {
    return await db.collection('task').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: event.name,
        phonenumber: event.phonenumber,
        openid: event.openid,
        address: event.address,
        text: event.text,
        sex:event.sex,
        time:event.time,
        done:false
      }
    })
  } catch (e) {
    console.error(e)
  }
}

























// 云函数入口文件
// const cloud = require('wx-server-sdk')

// cloud.init()

// // 云函数入口函数
// exports.main = async (event, context) => {
//   const wxContext = cloud.getWXContext()

//   return {
//     event,
//     openid: wxContext.OPENID,
//     appid: wxContext.APPID,
//     unionid: wxContext.UNIONID,
//   }
// }