const app = getApp()
Page({
  data: {
    name:null,
    phonenumber: null,
    sex: null,
    address: null,
    express: null,
    text: null,
  },
  onLoad: function (options) {
    //获取本地数据
    var name = wx.getStorageSync('name');
    var sex = wx.getStorageSync('sex');
    var phonenumber = wx.getStorageSync('phonenumber');
    var address = wx.getStorageSync('address');
  
    if (name) {
      this.setData({ name: name });
    } if (sex) {
      this.setData({ sex: sex });
    }

    
    if (phonenumber) {
      this.setData({ phonenumber: phonenumber });
    }
    if (address) {
      this.setData({ address: address });
    }


  },
addtask : function(e){
  if (e.detail.value.name == null || e.detail.value.sex == null || e.detail.value.phonenumber == null || e.detail.value.text == null || e.detail.value.address == null){
    wx.showToast({
      title: '请将内容填写完整',
      icon: 'none',
      duration: 2000
    })
  }else{
    wx.setStorageSync('name', e.detail.value.name );
    wx.setStorageSync('sex', e.detail.value.sex);
    wx.setStorageSync('phonenumber', e.detail.value.phonenumber);
    wx.setStorageSync('address', e.detail.value.address);
    
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 2000
    })
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
    var timestamp =
      Date.parse(new Date());
    //返回当前时间毫秒数
    timestamp = timestamp / 1000;
    //获取当前时间
    var n = timestamp *
      1000;
    var date = new Date(n);
    //年
    var Y =
      date.getFullYear();
    //月
    var M = (date.getMonth()
      + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日
    var D = date.getDate()
      < 10 ? '0' + date.getDate() :
      date.getDate();
    //时
    var h =
      date.getHours();
    //分
    var m =
      date.getMinutes();
    //秒
    var s =
      date.getSeconds();
    console.log(Y + "年" + M + "月" + D + "日" + h + "时" + m + "分" + s + "秒")
    var time = Y + "年" + M + "月" + D + "日" + h + "时" + m + "分" + s + "秒";

    //调用云函数
    wx.cloud.callFunction({
      // 云函数名称
      name: 'addtask',
      // 传给云函数的参数
      data: {
        openid: app.globalData.openid,
        name: e.detail.value.name,
        phonenumber: e.detail.value.phonenumber,
        sex: e.detail.value.sex,
        address: e.detail.value.address,
        text: e.detail.value.text,//要添加的值为输入框里的值
        time:time
      },
      success: function (res) {
        console.log(res.result)
        //更新成功后清空输入框的值
        _this.setData({
      
          text: null,
  
      
        })
      },
      fail: console.error
    })


}
}
})
