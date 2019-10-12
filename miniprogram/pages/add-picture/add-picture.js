// miniprogram/pages/picture/pictrue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filePaths: [],
    filePathIds: []
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
   * 上传图片ids到数据库
   */
  cloudFunction() {
    wx.showLoading({
      title: 'loading',
    })
    //调用云函数
    wx.cloud.callFunction({
      name: 'addPicture',
      data: {
        pictrueList: this.data.filePathIds,
        datetime: new Date().toLocaleString()
      },
      success: res => {
        wx.hideLoading()
        wx.showToast({
          title: '上传成功',
          icon: 'success'
        })
        wx.navigateBack()
        
      },
      fail: err => {
        wx.hideLoading()
        console.error('err', err)
      }
    })
  },
  /**
   * 上传图片到存储，并获取到ids
   */
  doUpload() {
    wx.showLoading({
      title: '上传中',
    })
    let timestamp = (new Date()).valueOf();
    let arr = []
    this.data.filePaths.forEach((item, index) => {
      // 上传图片
      wx.cloud.uploadFile({
        cloudPath: timestamp + index + item.match(/\.[^.]+?$/)[0],
        filePath: item,
        success: res => {
          // console.log('[上传文件] 成功：', res)
          arr.push(res.fileID)
          if (arr.length === this.data.filePaths.length) {
            console.log('filePathIds', arr)
            this.setData({
              filePathIds: arr
            })
            this.cloudFunction()
          }
        },
        fail: e => {
          // console.error('[上传文件] 失败：', e)
          wx.showToast({
            icon: 'none',
            title: '上传失败',
          })
        },
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  },
  /**
   * 选择图片
   */
  chooseImage () {
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // console.log(res)
        this.setData({
          filePaths: res.tempFilePaths
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
})