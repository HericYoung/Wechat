/*
* pages/newGame/newGame.js
* 新建牌局页面逻辑，用于登记玩家姓名
* 
* @Author: H3ric Young
* @Date:   2018-01-04 16:56:08
* @Last Modified by:   H3ric Young
* @Last Modified time: 2018-01-10 16:04:18
*/

//引入获取格式化系统时间的模块
var util = require('../../utils/util.js');  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    players_name:[],          //玩家姓名
    createtime:"",            //该牌局创建时间
    game_data:[],             //该局游戏的详细数据
    current_sum:[0,0,0,0],    //当前每人的累计剩余牌数
    input1LabelAnimation:{},  //玩家1姓名输入框的动画配置数据
    input2LabelAnimation: {}, //玩家2姓名输入框的动画配置数据
    input3LabelAnimation: {}, //玩家3姓名输入框的动画配置数据
    input4LabelAnimation: {}  //玩家4姓名输入框的动画配置数据
  },

  /**
   * [onLoad 页面加载
   * 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。]
   * 
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @param  {[type]}   options [description]
   * @return {[type]}           [description]
   */
  onLoad: function (options) {

  },

  /**
   * [onReady 生命周期函数--监听页面初次渲染完成]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onReady: function () {
    
  },

  /**
   * [onShow 生命周期函数--监听页面显示]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onShow: function () {
    //显示loading提示弹窗
    wx.showLoading({
      title: '正在创建新牌局......',
      mask: true,
    });

    wx.clearStorage();//清楚本地缓存

    //隐藏loading提示弹窗
    setTimeout(function () {
      wx.hideLoading();
    }, 1000);
  },


  /**
   * [onHide 生命周期函数--监听页面隐藏]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onHide: function () {
  
  },

  /**
   * [onUnload 生命周期函数--监听页面卸载]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onUnload: function () {
  
  },

  /**
   * [onPullDownRefresh 页面相关事件处理函数--监听用户下拉动作]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * [onReachBottom 页面上拉触底事件的处理函数]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onReachBottom: function () {
  
  },

  /**
   * [onShareAppMessage 用户点击右上角分享]
   * @author Heric
   * @date   2018-01-12
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onShareAppMessage: function () {
    return {
      title: '锄大地助手',
      path: '/pages/index/index'
    }
  },

  /**
   * [nameSubmit 提交玩家姓名]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @param  {[type]}   e [点击事件回调参数]
   * @return {[type]}     [description]
   */
  nameSubmit:function(e){
    var players_name = [
      e.detail.value.player1_name,
      e.detail.value.player2_name,
      e.detail.value.player3_name,
      e.detail.value.player4_name
    ];

    if(!players_name[0]){
      wx.showToast({
        title: '玩家1姓名?',
        icon:"loading",
        image:"../../icon/warn.png"
      })
      return;
    }
    if (!players_name[1]) {
      wx.showToast({
        title: '玩家2姓名?',
        icon: "loading",
        image: "../../icon/warn.png"
      })
      return;
    }
    if (!players_name[2]) {
      wx.showToast({
        title: '玩家3姓名?',
        icon: "loading",
        image: "../../icon/warn.png"
      })
      return;
    }
    if (!players_name[3]) {
      wx.showToast({
        title: '玩家4姓名?',
        icon: "loading",
        image: "../../icon/warn.png"
      })
      return;
    }

    if(savePlayerName(players_name)){
      console.log(players_name);
      
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

  /**
   * [nameReset 重置姓名输入]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  nameReset:function(){
    wx.showToast({
      title: '姓名已重置',
      image:"../../icon/ok.png"
    })
  },

  /**
   * [focusOnInput1 玩家1姓名输入框获得焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

  /**
   * [focusOnInput2 玩家2姓名输入框获得焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

  /**
   * [focusOnInput3 玩家3姓名输入框获得焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

  /**
   * [focusOnInput4 玩家4姓名输入框获得焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

  /**
   * [loseFocusOnInput1 玩家1姓名输入框失去焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

  /**
   * [loseFocusOnInput2 玩家2姓名输入框失去焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

  /**
   * [loseFocusOnInput3 玩家3姓名输入框失去焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

  /**
   * [loseFocusOnInput4 玩家4姓名输入框失去焦点时触发]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

/**
 * [savePlayerName 将玩家姓名和当前牌局创建时间保存到本地缓存中]
 * @author Heric
 * @date   2018-01-04
 *
 * @access [access]
 * @param  {[type]}   players_name [玩家姓名列表]
 */
function savePlayerName(players_name){
  var isSuccess = true;

  var now_time = util.formatTime(new Date()); 

  console.log("nowtime:"+now_time); 

  wx.setStorage({
    key: "players_name",
    data: players_name
  });

  wx.setStorage({
    key: "createtime",
    data: now_time,
    success:function(res){
      console.log(res);
    }
  });

  return isSuccess;
}