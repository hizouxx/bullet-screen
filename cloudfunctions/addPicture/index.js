// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//获取数据库句柄
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('picture_list').add({
      data: {
        pictrueList: event.pictrueList,
        datetime: event.datetime,
      }
    })
  } catch (err) {
    console.log(err)
  }
}