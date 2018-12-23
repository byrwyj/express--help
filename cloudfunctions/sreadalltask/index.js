// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数

exports.main = async (event, context) => {

  return await db.collection('task').where({
    done: true
  })
    .get() //get方法查询符合条件的记录，并通过return返回给调用此云函数的代码。一般在微信小程序端调用云函数。
}