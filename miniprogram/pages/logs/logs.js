// miniprogram/pages/logs.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logs: [
      {
        version_number: "v1.0.3（当前版本）",
        date: "2019-09-06",
        improvements: [
          '新增无序弹幕功能，可在右下角切换有序与无序；',
          '新增相册页；',
          '新增添加相册页；'
        ],
        bug_fixes: [
          '限制上传空图片列表；'
        ],
      },
      {
        version_number: "v1.0.2",
        date: "2019-09-05",
        improvements: [
          '新增Tabbar；',
          '新增弹幕详情列表页，点击弹幕可见；',
          '新增授权页，发送弹幕前用户需先授权用户信息'
        ],
        bug_fixes: [
          '修复可发射空弹幕的漏洞；'
        ],
      },
      {
        version_number: "v1.0.1",
        date: "2019-09-04",
        improvements: [
          '新增弹幕背景图,下拉可切换背景；',
          '优化添加弹幕页样式；'
        ],
        bug_fixes: [
          '修复背景图片在不同大小屏幕设备下的拉伸问题（但图片资源长度有限，iPhoneX等长屏设备会出现空白，其他设备正常，待以后替换图片资源）；'
        ],
      },
      {
        version_number: "v1.0.0",
        date: "2019-09-03",
        improvements: [
          '项目搭建',
        ],
        bug_fixes: [
          '无'
        ],
      }
    ]
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

  }
})