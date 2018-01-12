/*
* pages/GameMain/GameMain.js
* 游戏主页面
* 
* @Author: H3ric Young
* @Date:   2018-01-04 16:57:30
* @Last Modified by:   H3ric Young
* @Last Modified time: 2018-01-11 10:47:18
*/

var util = require('../../utils/util.js');  //引入获取格式化系统时间的模块

Page({

  /**
   * 页面的初始数据
   */
  data: {
    players_name: [],              //玩家姓名列表
    createtime: "",                 //该牌局创建时间
    game_data: [],                  //该局的详细数据
    current_sum:[0,0,0,0],          //当前的每个玩家累计剩余牌数
    number_values:{                 //剩余牌数选择器的数据列表
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

    picker_display:"none",           //剩余牌数选择器的显示状态
    picker_numbers:{0:0,1:0,2:0,3:0},//当前一轮的选择器的初始值
    round_addition:[],               //每轮每人添加的牌数（已经过倍数换算）
    isOver:false,                    //该局是否结束
    touch_bottom_tip:"往下拉查看更多"  //下拉提示信息
  },

  /**
   * [onLoad 生命周期函数--监听页面加载]
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
    wx.showLoading({
      title: "载入数据",
      mask: true,
    });
    setTimeout(function () {
      wx.hideLoading();
    }, 1000);
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
    //读取本地缓存数据
    var that = this;
    wx.getStorage({
      key: "players_name",
      success: function (res) {
        that.setData({ players_name: res.data });
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
   * [onHide 生命周期函数--监听页面隐藏]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onHide: function () {
  
  },

  /**
   * [onShareAppMessage 转发设置]
   * @author Heric
   * @date   2018-01-12
   * 
   * 
   */
  onShareAppMessage: function () {
    return {
      title: '锄大地助手',
      path: '/pages/index/index'
    }
  },

  /**
   * [onUnload 生命周期函数--监听页面卸载]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onUnload: function () {
  
  },

  /**
   * [onPullDownRefresh 页面相关事件处理函数--监听用户下拉动作]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * [onReachBottom 页面上拉触底事件的处理函数]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onReachBottom: function () {
  
  },

  /**
   * [onShareAppMessage 用户点击右上角分享]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onShareAppMessage: function () {
  
  },

  /**
   * [showPicker 展开新一轮记分编辑面板]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  newRound:function(){
    this.setData({"picker_display":"block"});
  },
  
  /**
   * [hidePicker 取消新一轮记分,隐藏选择器]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  hidePicker:function(){
    this.setData({ "picker_display": "none" });
  },

  /**
   * [addNewRound 提交新一轮记分]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   */
  submitNewRound:function(){
    var current_sum = this.data.current_sum;          //当前每人累计剩余牌数
    var picker_numbers = this.data.picker_numbers;    //选择器上的值
    var new_round_data = {};                          //新一轮的数据
    var game_data = this.data.game_data;              //该局完整数据
    var isOver = false;                               //该局是否结束
    var round_addition = this.data.round_addition;    //每轮每人增加的剩余牌数
    var new_addition = [];                            //最新一轮每人增加的牌数
    var winner = 0;                                   //该轮胜利人数,用于检查该轮数据登记是否出错

    //统计选择器上的胜利人数
    for(var index = 0;index < picker_numbers.length;index++){
      if(picker_numbers[index] == 0){
        winner++;
      }
    }

    //当胜利人数为0时
    if(winner == 0){
      wx.showToast({
        title: '没人赢的吗?',
        image: "../../icon/what.png"
      });
      return;
    }
    //当胜利人数多于1时
    else if(winner > 1){
      wx.showToast({
        title: '这么多人赢的吗？',
        image:"../../icon/what.png"
      });
      return;
    }

    //根据剩余牌数的不同情况做相应处理
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
    
    //记录到本地缓存中
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

    
    //判断每人当前累计剩余牌数，若存在超过或等于100的情况，将该局的状态改为结束
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

  /**
   * [picker_change 选择器有变动时触发]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @param  {[type]}   e [description]
   * @return {[type]}     [description]
   */
  picker_change:function(e){
    var values = e.detail.value;

    var picker_numbers = [values[0],values[1],values[2],values[3]];
    this.setData({ "picker_numbers": picker_numbers});
  },

  /**
   * [touchBottom 滚动条拉到底时触发]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  touchBottom:function(){
    this.setData({"touch_bottom_tip":"到底了"});
  },

  /**
   * [touchTop 滚动条拉到顶部时触发]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  touchTop: function () {
    this.setData({ "touch_bottom_tip": "往下拉查看更多" });
  },

  /**
   * [recallLatestRound 撤消最新一轮记分]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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

          //从当前每人的累计剩余牌数中减去最新一轮的剩余牌数
          for(var index = 0;index < current_sum.length;index++){
            current_sum[index] -= round_addition[round_addition.length-1][index];
          }

          //从该局的完整数据和每局的增长数据中移除最新一轮的数据
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

  /**
   * [newGame 在当前玩家下开始新牌局]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  newGame:function(){
    //将除了玩家名字以外的数据重置为初始值
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
  
  /**
   * [returnIndex 清除当前局数据并返回首页]
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
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
          wx.clearStorage();
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
