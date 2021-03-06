// pages/registerPage/registerPage.js
var util = require("../../utils/util.js");
const app = getApp();
var nickName = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;

    // 获取所有公司
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.getAllCompany,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()

        var list = res.data.getAllCompany
        console.log("查询结果为", res.data)
        if (list == undefined) {
          wx.showToast({
            title: "连接失败",
            icon: 'loading'
          });
        } else {
          that.setData({
            array: list
          })
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

  bindPickerChange: function(e) {
    console.log(e.detail)
    console.log('picker发送选择改变，携带值为', e.detail.value);
    this.setData({
      index: e.detail.value
    })
  },

  formRegister: function(e) {
    // 获取微信昵称，用于插入数据库
    nickName = wx.getStorageSync("nickName")
    console.log("保存的昵称为:", nickName)

    // 获取表单信息
    var that = this;
    var formData = e.detail.value;
    var telNum = formData.telephone
    console.log("表单信息: ", formData);

    // 注册页面信息跳转
    if (this.checkPageMsg(formData)) {
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

          if (userList == undefined) {
            wx.showToast({
              title: "连接失败",
              icon: 'loading'
            });     
          } else {
            if (userList.length == 0) {
              console.log("数据插入数据库中")
              // 修改插入数据
              var insertData = formData;
              insertData["wechatName"] = nickName
              insertData["authorizedFlag"] = "2"

              console.log(insertData)
              wx.request({
                url: app.globalData.addUserInfo,
                data: JSON.stringify(insertData),
                method: 'POST',
                header: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  var result = res.data.addUserInfo
                  console.log("操作结果", res.data);
                  if (result != true) {
                    wx.showToast({
                      title: '操作失败',
                      icon: "loading"
                    })
                  } else {
                    // 弹出提示信息
                    wx.showModal({
                      title: '温馨提示',
                      content: '请先等待，我们确认后会第一时间联系您！',
                      showCancel: false,
                      confrimText: "确定",
                      confirmColor: "#8B0000",
                      success: function (res) {
                        wx.reLaunch({
                          url: app.globalData.startPage,
                        })
                      }
                    })
                  }
                }
              })

            } else {
              // 手机号已经注册过
              console.log("手机号已经注册过")
              wx.showModal({
                title: '温馨提示',
                content: '手机号已注册，请勿重复注册！',
                showCancel: false,
                confrimText: "确定",
                confirmColor: "#8B0000",
                success: function () {
                  wx.navigateTo({
                    url: app.globalData.loginPage,
                  })
                }
              });
            }
          }
        },
        fail: function () {
          wx.hideLoading()

          wx.showToast({
            title: '操作失败',
            icon: "loading"
          })
        }
      })
    }
  },


  // 私有方法
  checkPageMsg: function(param) {
    console.log("检查页面信息是否合法！")
    // 检查用户名
    if (param.userName.length == 0 || param.userName.trim().length == 0) {
      wx.showToast({
        title: '姓名必填',
        icon: "loading"
      })
      return false;
    }

    // 检查工作邮箱
    var email = util.regexConfig().email;
    if (!email.test(param.mail)) {
      wx.showToast({
        title: '邮箱错误',
        icon: "loading"
      })
      return false;
    }

    // 检查手机号
    var phone = util.regexConfig().phone;
    if (!phone.test(param.telephone)) {
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