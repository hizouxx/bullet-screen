//add.js

Page({
  data: {
    userInfo: {},
    dmValue: '',
    bgImage: '../../images/bg-add2.jpeg'
  },

  onLoad: function () {
  },

  /**
   * 键盘输入事件
   */
  bindKeyInput: function (e) {
    this.setData({
      dmValue: e.detail.value
    })
  },

  /**
   * 上传数据库
   */
  cloudFunction() {
    wx.showLoading({
      title: 'loading',
    })
    // 调用云函数
    wx.cloud.callFunction({
      name: 'addBulletScreen',
      data: {
        content: this.data.dmValue,
        avatarUrl: this.data.userInfo.avatarUrl,
        gender: this.data.userInfo.gender,
        datetime: new Date().toLocaleString(),
        nickName: this.data.userInfo.nickName,
        like: 0
      },
      success: res => {
        // console.log('res', res)
        this.setData({
          dmValue: ''
        })
        wx.switchTab({
          url: '/pages/index/index'
        })
      },
      fail: err => {
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 2000
        })
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  },
  /**
   * 获取用户信息权限
   */
  getAuthorize(){
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              })
              this.cloudFunction()
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/authorize/authorize',
          })
        }
      }
    })
  },
  /**
   * 确定发送弹幕
   */
  bindconfirm () {
    //先去掉空格，若校验为空则中断程序
    if (!this.data.dmValue.replace(/^\s+|\s+$/g, "")) {
      wx.showToast({
        title: '弹幕不能为空',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    this.getAuthorize()
  }
})
