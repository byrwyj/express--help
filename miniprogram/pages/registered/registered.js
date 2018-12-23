const app = getApp()
Page({

  data: {
    truename:null,
    schoolnum:null,
    password: null,
    phonenum: null,
    roomnum: null

  },
  registered: function (e) {
    if (e.detail.value.schoolnum == null || e.detail.value.password == null || e.detail.value.truename == null || e.detail.value.phonenum == null || e.detail.value.roomnum == null) {
      wx.showToast({
        title: '请将信息填写完整！',
        icon: 'none',
        duration: 2000
      })}
      else{

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
    wx.cloud.callFunction({
      // 云函数名称
      name: 'reg',

      data: {
        openid: app.globalData.openid,
      },
      success: function (res) {
        console.log(res)
        if (res.result.data.length){
        wx.showToast({
          title: '您已注册过',
          icon: 'none',
          duration: 2000
        });
        }else{
    
    
    //调用云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: 'registered',
      data: {
        openid: app.globalData.openid,
        truename: e.detail.value.truename,
        schoolnum: e.detail.value.schoolnum,
        roomnum: e.detail.value.roomnum,
        password: e.detail.value.password,
        phonenum: e.detail.value.phonenum
      },
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 2000
        });
        wx.switchTab({
          url: '/pages/index/index',
        })
      },
      //fail函数为调用失败后的回调函数

      fail: console.error

    })
        }
      
      },

})
}}
})