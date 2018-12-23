// pages/staff/staff.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
  onClick(event) {
    if (event.detail.index == "0") {

      //检查基础库版本
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          traceUser: true,
        })
      }
      //保存this变量
      var _this = this;
      //调用云函数
      wx.cloud.callFunction({
        // 云函数名称
        name: 'sreadtask',
        data: {

        },
        //success函数为调用成功后的回调函数
        success: function (res) {
          _this.setData({
            record: res.result.data    //设置record值，显示在页面上。setData函数会触发页面的重新渲染
          })
          console.log(res)
        },
        //fail函数为调用失败后的回调函数
        fail: console.error
      })
    }
    else if (event.detail.index == "1") {

      //检查基础库版本
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          traceUser: true,
        })
      }
      //保存this变量
      var _this = this;
      //调用云函数
      wx.cloud.callFunction({
        // 云函数名称
        name: 'sreadalltask',
        data: {

        },
        //success函数为调用成功后的回调函数
        success: function (res) {
          _this.setData({
            record: res.result.data    //设置record值，显示在页面上。setData函数会触发页面的重新渲染
          })
          console.log(res)
        },
        //fail函数为调用失败后的回调函数
        fail: console.error
      })

    } else {
      wx.showToast({
        title: '错误',
        icon: 'success',
        duration: 2000
      })
    }
  },
})