// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//获取数据库句柄
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('bullet_screen_list').add({
      data: {
        content: event.content,
        avatarUrl: event.avatarUrl,
        gender: event.gender,
        datetime: event.datetime,
        nickName: event.nickName,
        like: event.like,
      }
    })
  } catch (err) {
    console.log(err)
  }
}