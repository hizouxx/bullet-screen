// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

//获取数据库句柄
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    list: await db.collection('picture_list').orderBy('datetime', 'desc').get(),//指定排序依据
  }
}