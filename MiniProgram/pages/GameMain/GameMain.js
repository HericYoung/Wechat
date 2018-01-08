// pages/GameMain/GameMain.js

var util = require('../../utils/util.js');  

Page({

  /**
   * 页面的初始数据
   */
  data: {
    player1_name: "",
    player2_name: "",
    player3_name: "",
    player4_name: "",
    createtime: "",
    game_data: [],
    current_sum:[0,0,0,0],
    number_values:{
                    0:0,
                    1:1,
                    2:2,
                    3:3,
                    4:4,
                    5:5,
                    6:6,
                    7:7,
                    8:8,
                    9:9,
                    10:10,
                    11:11,
                    12:12,
                    13:13
                  },
    picker_display:"none",
    picker_numbers:{0:0,1:0,2:0,3:0},
    round_addition:[],
    isOver:false,
    touch_bottom_tip:"往下拉查看更多"
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
    wx.showLoading({
      title: "载入数据",
      mask: true,
    });
    setTimeout(function () {
      wx.hideLoading();
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
        if(res.data)
          that.setData({ game_data: res.data });
      }
    });

    wx.getStorage({
      key: "createtime",
      success: function (res) {
        if(res.data){
          that.setData({ createtime: res.data });
        }
      }
    });

    wx.getStorage({
      key: "current_sum",
      success: function (res) {
        if(res.data){
          that.setData({ current_sum: res.data });
        }
      }
    });

    wx.getStorage({
      key: "round_addition",
      success: function (res) {
        if (res.data) {
          that.setData({ round_addition: res.data });
        }
      }
    });
    wx.getStorage({
      key: "isOver",
      success: function (res) {
        if (res.data) {
          that.setData({ isOver: res.data });
        }
      }
    })
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

  //展开新一轮记分编辑面板
  newRound:function(){
    this.setData({"picker_display":"block"});
  },
  
  //取消新一轮记分
  cancelNewRound:function(){
    this.setData({ "picker_display": "none" });
  },

  //提交新一轮记分
  addNewRound:function(){
    var current_sum = this.data.current_sum;
    var picker_numbers = this.data.picker_numbers;
    var new_round_data = {};
    var game_data = this.data.game_data;
    var isOver = false;
    var loser = "";
    var round_addition = this.data.round_addition;
    var new_addition = [];
    var winner = 0;

    for(var index = 0;index < picker_numbers.length;index++){
      if(picker_numbers[index] == 0){
        winner++;
      }
    }
    if(winner == 0){
      wx.showToast({
        title: '没人赢的吗?',
      });
      return;
    }
    else if(winner > 1){
      wx.showToast({
        title: '这么多人赢的吗？',
      });
      return;
    }

    for(var index = 0;index < current_sum.length;index++){
      if(picker_numbers[index] == 0){
        new_round_data[index] = "-";
        new_addition[index] = 0;
      }
      else{
        if (picker_numbers[index] >= 8 && picker_numbers[index] < 10){
          picker_numbers[index] *= 2; 
        }
        else if (picker_numbers[index] >= 10 && picker_numbers[index] < 13){
          picker_numbers[index] *= 3; 
        }
        else if (picker_numbers[index] == 13) {
          picker_numbers[index] *= 4;
        }

        current_sum[index] += picker_numbers[index];
        new_addition[index] = picker_numbers[index];
        new_round_data[index] = current_sum[index];
      }
    }
    round_addition.push(new_addition);
    game_data[game_data.length] = new_round_data;
    this.setData({"current_sum":current_sum});
    this.setData({"game_data":game_data});
    this.setData({ "round_addition": round_addition });
    
    
    wx.setStorage({
      key: "current_sum",
      data: current_sum
    });

    wx.setStorage({
      key: "game_data",
      data: game_data
    });

    wx.setStorage({
      key: "round_addition",
      data: round_addition
    });

    

    for(var num in current_sum){
      if(current_sum[num] >= 100){
        isOver = true;
        // switch(num){
        //   case '0':loser = this.data.player1_name;break;
        //   case '1': loser = this.data.player2_name; break;
        //   case '2': loser = this.data.player3_name; break;
        //   default: loser = this.data.player4_name; break;
        // }
        // break;
      }
    }

    this.setData({"picker_display":"none"});

    this.setData({ "isOver": isOver });

    if(isOver){
      wx.showModal({
        // title: '',
        content: '结束',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '知道了',
        confirmColor: '#07689F',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
    else{

    }
    wx.setStorage({
      key: "isOver",
      data: isOver
    });
  },

  picker_change:function(e){
    var values = e.detail.value;

    var picker_numbers = [values[0],values[1],values[2],values[3]];
    this.setData({ "picker_numbers": picker_numbers});
  },
  touchBottom:function(){
    this.setData({"touch_bottom_tip":"到底了"});
  },
  touchTop: function () {
    this.setData({ "touch_bottom_tip": "往下拉查看更多" });
  },

  //撤消最新一轮记分
  recallLatestRound:function(){
    var that = this;
    var game_data = that.data.game_data;
    var current_sum = that.data.current_sum;
    var round_addition = that.data.round_addition;
    var isOver = false;
    if(game_data.length == 0){
      wx.showToast({
        image:"../../icon/nodata.png",
        title: '暂无数据',
      });
      return;
    }

    wx.showModal({
      // title: '确认',
      content: '确认删除最新一轮记分',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确认',
      confirmColor: '#07689F',
      success: function(res) {
        if(res.confirm){
          console.log("删除前"+current_sum);
          for(var index = 0;index < current_sum.length;index++){
            console.log(game_data[game_data.length - 1][index]);
            current_sum[index] -= round_addition[round_addition.length-1][index];
          }
          console.log("删除后" + current_sum);
          game_data.pop();
          round_addition.pop();
          that.setData({"game_data":game_data});
          that.setData({"current_sum":current_sum});
          that.setData({ "round_addition": round_addition });
          that.setData({"isOver":isOver});
          wx.setStorage({
            key: 'game_data',
            data: game_data,
          });

          wx.setStorage({
            key: 'current_sum',
            data: current_sum,
          });

          wx.setStorage({
            key: 'round_addition',
            data: round_addition,
          });

          wx.setStorage({
            key: "isOver",
            data: isOver
          });

          wx.showToast({
            title: '成功',
            icon: 'success',
            image: '../../icon/ok.png',
            duration: 1000,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 在当前玩家下开始新牌局
  newGame:function(){
    var game_data = [];
    var current_sum = [0, 0, 0, 0];
    var picker_numbers = { 0:0, 1:0, 2:0, 3:0 };
    var round_addition = [];
    var createtime = util.formatTime(new Date()); 
    var that = this;

    wx.showModal({
      // title: '',
      content: '确认开始新的一局？',
      showCancel: true,
      cancelText: '不',
      cancelColor: '',
      confirmText: '是是是',
      confirmColor: '#07689F',
      success: function(res) {
        if(res.confirm){
          wx.setStorage({
            key: 'game_data',
            data: game_data,
          });

          wx.setStorage({
            key: 'current_sum',
            data: current_sum,
          });

          wx.setStorage({
            key: 'round_addition',
            data: round_addition,
          });

          wx.setStorage({
            key: 'createtime',
            data: createtime
          });
          wx.setStorage({
            key: 'isOver',
            data: false
          });

          that.setData({ 'game_data': game_data });
          that.setData({ 'current_sum': current_sum });
          that.setData({ 'round_addition': round_addition });
          that.setData({ 'createtime': createtime });
          that.setData({ 'isOver': false });

          wx.showToast({
            title: '新局开始',
            icon: '',
            image: '',
            duration: 1000,
            mask: true,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          });
          console.log("新局开始");
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 在当前玩家下开始新牌局end
  
  //清除当前局数据并返回首页
  returnIndex:function(){
    wx.showModal({
      // title: '',
      content: '返回首页将清除该局数据，确认返回？',
      showCancel: true,
      cancelText: '不',
      cancelColor: '',
      confirmText: '是',
      confirmColor: '#07689F',
      success: function(res) {
        if(res.confirm){
          clearLastGameData();
          wx.reLaunch({
            url: '../index/index',
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})

//清除缓存
function clearLastGameData() {
  var isSuccess = true;
  wx.removeStorage({
    key: 'player1_name',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  wx.removeStorage({
    key: 'player2_name',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  wx.removeStorage({
    key: 'player3_name',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  wx.removeStorage({
    key: 'player4_name',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  wx.removeStorage({
    key: 'createtime',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  wx.removeStorage({
    key: 'game_data',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  wx.removeStorage({
    key: 'current_sum',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  wx.removeStorage({
    key: 'round_addition',
    success: function (res) {
      console.log(res.data)
    },
    fail: function () {
      isSuccess = false;
    }
  });

  console.log("清除旧数据");
  return isSuccess;
}