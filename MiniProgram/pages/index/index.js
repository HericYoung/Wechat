//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    player1_name: "",
    player2_name: "",
    player3_name: "",
    player4_name: "",
    createtime: "",
    game_data: [],
    current_sum: [0,0,0,0],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("页面初始化hhhh");
  },
  onReady: function () {
    // 页面渲染完成
    console.log("页面渲染完成hhhh");
    var that = this;
    wx.getStorage({
      key: "player1_name",
      success: function (res) {
        that.setData({ player1_name: res.data });
      }
    });

    wx.getStorage({
      key: "player2_name",
      success: function (res) {
        that.setData({ player2_name: res.data });
      }
    });

    wx.getStorage({
      key: "player3_name",
      success: function (res) {
        that.setData({ player3_name: res.data });
      }
    });

    wx.getStorage({
      key: "player4_name",
      success: function (res) {
        that.setData({ player4_name: res.data });
      }
    });

    wx.getStorage({
      key: "game_data",
      success: function (res) {
        if(res.data){
          that.setData({ game_data: res.data });
        }
      }
    })

    wx.getStorage({
      key: "createtime",
      success: function (res) {
        if(res.data){
          that.setData({ createtime: res.data });
        }
      }
    }),
      wx.getStorage({
        key: "current_sum",
        success: function (res) {
          if(res.data){
            that.setData({current_sum: res.data });
          }
        }
      })
  },
  onShow: function () {
    // 页面显示
    console.log("页面显示hhhh");
  },
  onHide: function () {
    // 页面隐藏
    console.log("页面隐藏hhhh");
  },
  onUnload: function () {
    // 页面关闭
    console.log("页面关闭hhhh");
  },
  onPullDownRefresh:function(){
    console.log("下拉刷新hhhh");
  },
  newGame:function(){
    if(this.data.createtime) {
      wx.showModal({
        title: "提示",
        content: "发现手机本地保存有未完成的牌局，需要继续进行吗？",
        cancelText: "新建牌局",
        // concelColor:,
        // confirmColor:,
        confirmText: "继续牌局",
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../GameMain/GameMain',
            })
          }
          if (res.cancel) {
            wx.navigateTo({
              url: '../newGame/newGame',
            })
          }
        },
        fail: function () {

        }
      });
    }
    else{
      wx.navigateTo({
        url: '../newGame/newGame',
      })
    }
  }
})
