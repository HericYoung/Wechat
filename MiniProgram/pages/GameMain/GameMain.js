// pages/GameMain/GameMain.js
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
    addRoundBtnDisabled:"false",
    new_round_number:{0:0,1:0,2:0,3:0}
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
    var new_round_number = this.data.new_round_number;
    var new_round_data = {};
    var game_data = this.data.game_data;
    var isOver = false;
    var loser = "";

    for(var index = 0;index < current_sum.length;index++){
      if(new_round_number[index] == 0){
        new_round_data[index] = "-";
      }
      else{
        if (new_round_number[index] >= 8 && new_round_number[index] < 10){
          new_round_number[index] *= 2; 
        }
        else if (new_round_number[index] >= 10 && new_round_number[index] < 13){
          new_round_number[index] *= 3; 
        }
        else if (new_round_number[index] == 13) {
          new_round_number[index] *= 4;
        }

        current_sum[index] += new_round_number[index];
        new_round_data[index] = current_sum[index];
      }
    }
    game_data[game_data.length] = new_round_data;
    new_round_number = [0,0,0,0];
    this.setData({"current_sum":current_sum});
    this.setData({"game_data":game_data});
    this.setData({"new_round_number": new_round_number});
    
    wx.setStorage({
      key: "current_sum",
      data: current_sum
    });

    wx.setStorage({
      key: "game_data",
      data: game_data
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

    if(isOver){
      wx.showModal({
        content: "结束"
      })
      clearLastGameData();
      this.setData({"addRoundBtnDisabled":"true"});

    }
    else{

    }
  },

  picker_change:function(e){
    var values = e.detail.value;

    var new_round_number = [values[0],values[1],values[2],values[3]];
    this.setData({ "new_round_number": new_round_number});
  },

  //撤消最新一轮记分
  recallLatestRound:function(){
    var that = this;
    var game_data = that.data.game_data;
    var current_sum = that.data.current_sum;

    wx.showModal({
      // title: '确认',
      content: '确认删除最新一轮记分',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确认',
      confirmColor: '',
      success: function(res) {
        if(res.confirm){
          console.log("删除前"+current_sum);
          for(var index = 0;index < current_sum.length;index++){
            console.log(game_data[game_data.length - 1][index]);
            if(game_data[game_data.length-1][index] == "-"){
            }
            else{
              current_sum[index] -= game_data[game_data.length - 2][index];
            }
          }
          console.log("删除后" + current_sum);
          game_data.pop();
          that.setData({"game_data":game_data});
          that.setData({"current_sum":current_sum});

          wx.setStorage({
            key: 'game_data',
            data: game_data,
          });

          wx.setStorage({
            key: 'current_sum',
            data: current_sum,
          });

          wx.showToast({
            title: '成功',
            icon: 'success',
            image: '',
            duration: 0,
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
  console.log("清除旧数据");
  return isSuccess;
}