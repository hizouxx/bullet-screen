// miniprogram/pages/picture/pictrue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    pictures: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPicFileIds()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * upload
   */
  upload() {
    wx.navigateTo({
      url: '/pages/add-picture/add-picture',
    })
  },

  /**
 * 从数据库获取图片的fileId，然后去云存储下载，最后加载出来
 */

  downloadImages() {
    let arr = []
    this.data.dataList.forEach((item, index) => {
      wx.cloud.getTempFileURL({
        fileList: item.pictrueList,
        success: res => {
          // console.log('fileList', res.fileList)
          arr.push({
            list: res.fileList,
            datetime: item.datetime
          })
          // console.log('arr', arr)
          this.setData({
            pictures: arr
          })
        },
        fail: err => {
          console.error('err', err)
        }
      })
    })
  },

  /**
   * 从数据库获取图片的fileId，然后去云存储下载，最后加载出来
   */
  getPicFileIds: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'pictureList',
      data: {},
      success: res => {
        // console.log('res', res)
        this.setData({
          dataList: res.result.list.data
        })
        this.downloadImages()
      },
      fail: err => {
        console.error('[云函数] 调用失败', err)
      }
    })
  }
})