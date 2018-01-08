// pages/newGame/newGame.js

var util = require('../../utils/util.js');  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    player1_name:"",
    player2_name:"",
    player3_name:"",
    player4_name:"",
    createtime:"",
    game_data:[],
    current_sum:[0,0,0,0],
    input1LabelAnimation:{},
    input2LabelAnimation: {},
    input3LabelAnimation: {},
    input4LabelAnimation: {}
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
      title: '正在创建新牌局......',
      mask:true,
    });

    setTimeout(function () {
      wx.hideLoading();
    }, 1000);

    console.log(clearLastGameData());
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
  
  },

  // 提交玩家姓名
  nameSubmit:function(e){
    var player1_name = e.detail.value.player1_name;
    var player2_name = e.detail.value.player2_name;
    var player3_name = e.detail.value.player3_name;
    var player4_name = e.detail.value.player4_name;

    if(!player1_name){
      wx.showToast({
        title: '玩家1姓名?',
        icon:"loading",
        image:"../../icon/warn.png"
      })
      return;
    }
    if (!player2_name) {
      wx.showToast({
        title: '玩家2姓名?',
        icon: "loading",
        image: "../../icon/what.png"
      })
      return;
    }
    if (!player3_name) {
      wx.showToast({
        title: '玩家3姓名?',
        icon: "loading",
        image: "../../icon/what.png"
      })
      return;
    }
    if (!player4_name) {
      wx.showToast({
        title: '玩家4姓名?',
        icon: "loading",
        image: "../../icon/what.png"
      })
      return;
    }

    if(savePlayerName(player1_name, player2_name, player3_name, player4_name)){
      wx.redirectTo({
        url: '../GameMain/GameMain',
      })

    }
    else{
      wx.showToast({
        title: '提交失败，请重新提交',
      })
    }
  },

  // 重置姓名输入
  nameReset:function(){
    wx.showToast({
      title: '姓名已重置',
      image:"../../icon/ok.png"
    })
  },
  focusOnInput1:function(){
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });

    animation.translate(-10,-40).step();

    this.setData({
      input1LabelAnimation: animation.export()
    })
  },
  focusOnInput2: function () {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });

    animation.translate(-10, -40).step();

    this.setData({
      input2LabelAnimation: animation.export()
    })
  },
  focusOnInput3: function () {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });

    animation.translate(-10, -40).step();

    this.setData({
      input3LabelAnimation: animation.export()
    })
  },
  focusOnInput4: function () {
    var animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 0
    });

    animation.translate(-10, -40).step();

    this.setData({
      input4LabelAnimation: animation.export()
    })
  },


  loseFocusOnInput1:function(e){
    if(e.detail.value == ""){
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
      });
      animation.step();

      this.setData({
        input1LabelAnimation: animation.export()
      })
    }
  },
  loseFocusOnInput2: function (e) {
    if (e.detail.value == "") {
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
      });
      animation.step();

      this.setData({
        input2LabelAnimation: animation.export()
      })
    }
  }, 
  loseFocusOnInput3: function (e) {
    if (e.detail.value == "") {
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
      });
      animation.step();

      this.setData({
        input3LabelAnimation: animation.export()
      })
    }
  },
  loseFocusOnInput4: function (e) {
    if (e.detail.value == "") {
      var animation = wx.createAnimation({
        transformOrigin: "50% 50%",
        duration: 1000,
        timingFunction: "ease",
        delay: 0
      });
      animation.step();

      this.setData({
        input4LabelAnimation: animation.export()
      })
    }
  }
  

});

//清除上一盘游戏的缓存
function clearLastGameData(){
  var isSuccess = true;
  wx.removeStorage({
    key: 'player1_name',
    success: function (res) {
      console.log(res.data)
    },
    fail:function(){
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
    key: 'isOver',
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
//clearLastGameData  end

// 将玩家姓名保存到手机缓存中
function savePlayerName(player1_name, player2_name, player3_name, player4_name){
  var isSuccess = true;
  var now_time = util.formatTime(new Date()); 
  console.log(now_time); 

  wx.setStorage({
    key: "player1_name",
    data: player1_name
  });
  wx.setStorage({
    key: "player2_name",
    data: player2_name
  });
  wx.setStorage({
    key: "player3_name",
    data: player3_name
  });
  wx.setStorage({
    key: "player4_name",
    data: player4_name
  });
  wx.setStorage({
    key: "createtime",
    data: now_time
  });
  return isSuccess;
}