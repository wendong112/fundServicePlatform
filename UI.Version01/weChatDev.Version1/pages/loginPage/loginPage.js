// pages/registerPage/registerPage.js
var util = require("../../utils/util.js");
const app = getApp();
var nickName = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: app.globalData.transferTitle,
      path: app.globalData.startPage,
      imageUrl: app.globalData.transferImage
    }
  },

  loginSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;
    var telNum = formData.telNumberName;

    // 获取微信昵称，用于插入数据库
    nickName = wx.getStorageSync("nickName")
    console.log("保存的昵称为:", nickName)

    // 登录页面信息跳转
    if (this.checkPhoneRight(telNum)) {
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: app.globalData.getUserByPhone,
        data: {
          "telephone": telNum
        },
        method: 'GET',
        success: function (res) {
          wx.hideLoading()

          var userList = res.data.getUserByPhone
          console.log("查询结果:", res.data)
          if(userList == undefined) {
            wx.showToast({
              title: "连接失败",
              icon: 'loading'
            });
          } else {
            // 手机号不在数据库中
            if (userList.length == 0) {
              // 弹出提示信息
              wx.showModal({
                title: '温馨提示',
                content: '未找到匹配手机号，请先注册！',
                showCancel: false,
                confrimText: "确定",
                confirmColor: "#8B0000",
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: app.globalData.registerPage,
                    })
                  }
                }
              })
              // 手机号在数据库中
            } else {
              // 获取微信昵称，用于比对
              console.log("检查昵称是否在数据库中");
              console.log("当前使用微信的昵称为: ", nickName);
              var dbNick = userList[0].wechatName
              console.log("数据库中的名称为", dbNick)

              // 比对昵称
              if (dbNick == nickName) {
                // 比对权限
                var flag = userList[0].authorizedFlag
                if (flag == "2") {
                  console.log("没有权限登录");
                  wx.showModal({
                    title: '温馨提示',
                    content: '权限不足，请联系管理员修改！',
                    showCancel: false,
                    confrimText: "确定",
                    confirmColor: "#8B0000",
                    success: function (res) {
                      if (res.confirm) {
                        wx.reLaunch({
                          url: app.globalData.startPage,
                        })
                      }
                    }
                  })
                } else {
                  // 记录登录信息
                  wx.setStorageSync("telNum", telNum);
                  wx.setStorageSync("currentCompany", userList[0].companyName);

                  wx.switchTab({
                    url: app.globalData.firstTab,
                  })
                }
              } else {
                console.log("数据库中找不到对应昵称！")
                wx.showModal({
                  title: '温馨提示',
                  content: '登录昵称与注册时昵称不相符，请联系管理员修改或重新注册！',
                  showCancel: false,
                  confrimText: "确定",
                  confirmColor: "#8B0000",
                  success: function (res) {
                    if (res.confirm) {
                      wx.reLaunch({
                        url: app.globalData.startPage,
                      })
                    }
                  }
                });
              }
            }
          }

        },
        fail: function () {
          wx.hideLoading()

          wx.showToast({
            title: '查询失败',
            icon: "loading"
          })
        }
      })
    }
  },

  // 检查手机号正确
  checkPhoneRight: function(telNum) {
    console.log("检查页面手机号是否合法")
    var phone = util.regexConfig().phone;
    if (!phone.test(telNum)) {
      wx.showToast({
        title: '手机号错误',
        icon: "loading"
      })
      return false;
    }

    // 返回信息正确
    return true;
  }
})