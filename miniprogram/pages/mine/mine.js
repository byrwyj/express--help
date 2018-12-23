 var app=getApp()
Page({
  data: {
    
  },
   onClick(event) {
    if(event.detail.index=="0"){
  
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
      name: 'readtask',
      data: {
        openid: app.globalData.openid
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
    })}
    else if (event.detail.index == "1"){
     
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
        name: 'readalltask',
        data: {
          openid: app.globalData.openid
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

    }else{
    wx.showToast({
      title: '错误',
      icon: 'success',
      duration: 2000
    })}
  },

 confirm: function (event) {
   wx.showToast({
     title: '已收货，请刷新',
     icon: 'success',
     duration: 2000
   })
console.log(event.currentTarget.id)
   if (!wx.cloud) {
     console.error('请使用 2.2.3 或以上的基础库以使用云能力')
   } else {
     wx.cloud.init({
       traceUser: true,
     })
   }
   //调用云函数
   wx.cloud.callFunction({

     // 云函数名称

     name: 'confirm',

     // 传给云函数的参数

     data: {

       _id: event.currentTarget.id     //要更新的值为输入框里的值

    
     },

     success: function (res) {
       console.log(res.result)
     }
 })
 }
})