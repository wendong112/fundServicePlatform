const app = getApp()
var allList = [];
var removeList = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: app.globalData.rightArrowImage,
    sceneArray: [],
    savePath: "", // 保存文件位置
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var reqId = options.id
    var that = this;
    console.log("准备查找业务场景：", reqId);

    if (reqId == undefined) {
      console.log("无法查找");
      wx.showToast({
        title: '无法查找',
        icon: "loading"
      })
    } else {
      console.log("开始查找")
      wx.showLoading({
        title: '加载中...',
      })

      wx.request({
        url: app.globalData.getScenarioByReqId,
        data: { "requirementId": reqId },
        method: 'GET',
        success: function (res) {
          wx.hideLoading()

          var list = res.data.getScenarioByReqId;
          console.log("查询结果:", res.data)
          if (list == undefined) {
            wx.showToast({
              title: "连接失败",
              icon: 'loading'
            });
          } else {
            allList = list;

            that.setData({
              sceneArray: list
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
    }
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
    return {
      title: app.globalData.transferTitle,
      path: app.globalData.startPage,
      imageUrl: app.globalData.transferImage
    }
  },

  // 隐藏场景列表
  closeBrief: function(e) {
    var clickId = e.target.id;
    console.log("点击的id为: ", clickId);
    console.log("原有隐藏列表为: ", removeList);

    // 根据removeList元素存在则添加，没有则删除
    var index = this.indexOf(removeList, clickId)
    if (index > -1) {
      removeList.splice(index, 1);
    } else {
      if (clickId != "") {
        removeList.push(clickId)
      }
    }
    console.log("最新隐藏列表为: ", removeList);

    // 从列表中删除不显示的选项
    var list = allList;
    var result = [];
    for(var i = 0; i < list.length; i++) {
      var showFlag = true;
      var tmpId = list[i].fatherNode

      for (var j = 0; j < removeList.length; j++) {
        var tmpRemoveId = removeList[j]
        if (tmpId.indexOf(tmpRemoveId + "-") == 0 && tmpId != tmpRemoveId) {
          console.log(tmpId, "隐藏")
          showFlag = false;
        }
      }

      if(showFlag) {
        result.push(list[i])
      }
    }

    // 出现问题，所有都被删除后，直接全部显示
    if (result.length == 0) {
      result = list;
    }

    this.setData({
      sceneArray: result,
    })
  },

  clickDownload: function(e) {
    var fileName = e.target.id;
    var that = this;
    console.log("准备下载:", fileName);
    if (fileName == "" || fileName == undefined) {
        console.log("无法下载")

        wx.showToast({
          title: '无法下载',
          icon: "loading"
        })
    } else {
      var url = app.globalData.downloadURL+ "?fileName=" + fileName + ".docx";
      console.log("下载链接为：", url)

      wx.showLoading({
        title: '正在下载...',
      })
      wx.downloadFile({
        url: url,
        success: function (res) {
          wx.hideLoading()
          console.log("临时文件位置：", res.tempFilePath);

          // wx.showLoading({
          //   title: '正在打开文件',
          // })
          // wx.openDocument({
          //   filePath: res.tempFilePath,
          //   success: function (res) {
          //     wx.hideLoading()
          //     console.log("打开成功", res)
          //   },
          //   fail: function (res) {
          //     wx.hideLoading()
          //     console.log("打开失败", res)
          //     wx.showToast({
          //       title: '打开失败',
          //       icon: "loading"
          //     })
          //   }
          // })
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function (res) {
              wx.showToast({
                title: '下载成功',
              })
              console.log("下载后信息：", res)

              that.setData({
                savePath: res.savedFilePath
              })

              wx.showLoading({
                title: '正在打开文件',
              })
              wx.openDocument({
                filePath: res.savedFilePath,
                success: function (res) {
                  wx.hideLoading()
                  console.log("打开成功", res)
                },
                fail: function (res) {
                  wx.hideLoading()
                  console.log("打开失败", res)
                  wx.showToast({
                    title: '下载失败',
                    icon: "loading"
                  })
                }
              })
            }
          })
        },
        fail: function(res) {
          wx.hideLoading()

          console.log("下载文件失败")
          wx.showToast({
            title: '下载失败',
            icon: "loading"
          })
        }
      })
    }
  },

  indexOf: function (list, val) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] == val) return i;
    }
    return -1;
  }
})
