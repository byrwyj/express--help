var app = getApp()
Page({
  data: {
    schoolnum: null,
    password: null
  },
  login: function (e) {
    if (e.detail.value.schoolnum == null || e.detail.value.password== null){
      wx.showToast({
        title: '请正确填写学号和密码',
        icon: 'none',
        duration: 2000
      })
    }else {
    app.globalData.schoolnum = e.detail.value.schoolnum
    app.globalData.password = e.detail.value.password
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
      name: 'denglu',
      //success函数为调用成功后的回调函数
data:{
  openid:app.globalData.openid,
},
      success: function (res) {
       
        if((res.result.data[0].schoolnum==app.globalData.schoolnum)&&(
          res.result.data[0].password == app.globalData.password
        ) && (res.result.data[0].openid == app.globalData.openid)
        ){
          wx.setStorageSync('schoolnum', app.globalData.schoolnum);
          wx.setStorageSync('password', app.globalData.password);
        wx.switchTab({
          url: '/pages/index/index',
        })
        }
        else{
          wx.showToast({
            title: '登陆失败',
            icon: 'none',
            duration: 2000
          });

        }
    
      },
      //fail函数为调用失败后的回调函数

      fail : function () { wx.showToast({
        title: '登陆失败',
        icon: 'none',
        duration: 2000
      })
      }
    })
    }
  },
  registered: function () {
   
wx.navigateTo({
  url: '../registered/registered',
})
  },
  onLoad: function (options) {
    //获取本地数据
    var schoolnum = wx.getStorageSync('schoolnum');
    var password = wx.getStorageSync('password');

    console.log(schoolnum);
    console.log(password);
    if (schoolnum) {
      this.setData({ schoolnum: schoolnum });
    }
    if (password) {
      this.setData({ password: password });
    }

  },
  staff: function () {

    wx.cloud.callFunction({
      // 云函数名称
      name: 'staff',
      data: {
        openid:app.globalData.openid
      },
      success: function (res) {
console.log(res)
        if (res.result.data[0].openid == app.globalData.openid
        ) {
          wx.navigateTo({
            url: '../staff/staff',
          })
        }
        else {
          wx.showToast({
            title: '您不是员工！',
            icon: 'none',
            duration: 2000
          });

        }
      

      }
      })
      },
      logic:function(){
   wx.navigateTo({
     url: '../b/b',
     success: function(res) {},
     fail: function(res) {},
     complete: function(res) {},
   })
      }
})