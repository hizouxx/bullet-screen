//index.js
const app = getApp()

Page({
  data: {
    userInfo: {}, //个人信息
    resData: [], //从后台获取到的原始数据
    orderedList: [], //有序弹幕列表
    disorderList: [], //无序弹幕列表
    iconBoy: '../../images/icon-boy.png',
    iconGirl: '../../images/icon-girl.png',
    bgImages: [
      '../../images/bg0.jpeg',
      '../../images/bg1.jpeg',
      '../../images/bg2.jpeg',
      '../../images/bg3.jpeg',
      '../../images/bg4.jpeg',
      '../../images/bg5.jpeg',
      '../../images/bg6.jpeg',
      '../../images/bg7.jpeg',
      '../../images/bg8.jpeg',
      '../../images/bg9.jpeg',
    ],
    curBgImageIndex: 1
  },

  onLoad: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onGetBulletScreenList()
  },

  /**
   * 下滑刷新事件
   */
  onPullDownRefresh() {
    let len = this.data.bgImages.length
    if (this.data.curBgImageIndex === len-1) {
      this.setData({
        curBgImageIndex: 0
      })
    } else {
      this.setData({
        curBgImageIndex: this.data.curBgImageIndex+1
      })
    }
    wx.stopPullDownRefresh()//得到结果后关掉刷新动画

  },


  /**
   * 进入弹幕列表详情
   */
  interList() {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },


  /**
   * 有序弹幕(一维数组转换为二维数组)
   */
  orderedTrans: function () {
    const num = 6; //每行显示条数
    const len = this.data.resData.length; //数据总数
    const rows = len % num === 0 ?len / num : Math.floor((len / num) + 1);
    let arr = [];
    for (let i = 0; i < rows; i++) {
      // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。
      // 且原始数组不会被修改。
      let temp = this.data.resData.slice(i * num, i * num + num);
      arr.push(temp);
    }
    this.setData({
      orderedList: arr,
      disorderList: []
    });
  },
  /**
   * 无序弹幕
   */
  disorderTrans: function () {
    let arr = [];
    for (let i = 0; i < this.data.resData.length; i++) {
      const _time = Math.floor(Math.random() * 10);
      const time = _time < 6 ? 6 + i : _time + i;
      const top = Math.floor(Math.random() * 80) + 2;
      const _p = {
        _id: this.data.resData[i]._id,
        gender: this.data.resData[i].gender,
        content: this.data.resData[i].content,
        avatarUrl: this.data.resData[i].avatarUrl,
        like: this.data.resData[i].like,
        top,
        time
      };
      arr.push(_p);
    }
    this.setData({
      orderedList: [],
      disorderList: arr
    });
  },

  /**
   * 切换有序or无序弹幕
   */
  switchChange(e) {
    app.globalData.ToggleType = e.detail.value
    this.tgggleTypeFun()
  },


  /**
   * tgggleTypeFun
   */
  tgggleTypeFun() {
    if (app.globalData.ToggleType) {
      this.orderedTrans()
    } else {
      this.disorderTrans()
    }
  },

  /**
   * 获取数据库数据
   */
  onGetBulletScreenList: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'bulletScreenList',
      data: {},
      success: res => {
        console.log('res', res)
        this.setData({
          resData: res.result.list.data
        });
        this.tgggleTypeFun()
      },
      fail: err => {
        console.error('[云函数] 调用失败', err)
      }
    })
  }
})
