/*
* pages/GameMain/GameMain.js
* 游戏主页面
* 
* @Author: H3ric Young
* @Date:   2018-01-04 16:57:30
* @Last Modified by:   H3ric Young
* @Last Modified time: 2018-01-11 10:47:18
*/
import * as echarts from '../../ec-canvas/echarts';

var util = require('../../utils/util.js');  //引入获取格式化系统时间的模块

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      lazyLoad:true,
    },
    value_name_array: [['赢', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], ['赢', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], ['赢', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], ['赢', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]],
    current_value_array: [0, 0, 0,0],
    key_value_Array: [
        [
            { id: 0,name: '赢'},
            { id: 1,  name: 1 },
            { id: 2, name: 2 },
            { id: 3, name: 3 },
            { id: 4, name: 4 },
            { id: 5, name: 5 },
            { id: 6, name: 6 },
            { id: 7, name: 7 },
            { id: 8, name: 8 },
            { id: 8, name: 9 },
            { id: 9, name: 10 },
            { id: 10, name: 11 },
            { id: 11, name: 11 },
            {id: 12, name: 12},
            { id: 13, name: 13 },
        ],
        [
            { id: 0, name: '赢' },
            { id: 1, name: 1 },
            { id: 2, name: 2 },
            { id: 3, name: 3 },
            { id: 4, name: 4 },
            { id: 5, name: 5 },
            { id: 6, name: 6 },
            { id: 7, name: 7 },
            { id: 8, name: 8 },
            { id: 8, name: 9 },
            { id: 9, name: 10 },
            { id: 10, name: 11 },
            { id: 11, name: 11 },
            { id: 12, name: 12 },
            { id: 13, name: 13 },
        ],
        [
            { id: 0, name: '赢' },
            { id: 1, name: 1 },
            { id: 2, name: 2 },
            { id: 3, name: 3 },
            { id: 4, name: 4 },
            { id: 5, name: 5 },
            { id: 6, name: 6 },
            { id: 7, name: 7 },
            { id: 8, name: 8 },
            { id: 8, name: 9 },
            { id: 9, name: 10 },
            { id: 10, name: 11 },
            { id: 11, name: 11 },
            { id: 12, name: 12 },
            { id: 13, name: 13 },
        ],
        [
            { id: 0, name: '赢' },
            { id: 1, name: 1 },
            { id: 2, name: 2 },
            { id: 3, name: 3 },
            { id: 4, name: 4 },
            { id: 5, name: 5 },
            { id: 6, name: 6 },
            { id: 7, name: 7 },
            { id: 8, name: 8 },
            { id: 8, name: 9 },
            { id: 9, name: 10 },
            { id: 10, name: 11 },
            { id: 11, name: 11 },
            { id: 12, name: 12 },
            { id: 13, name: 13 },
        ],
    ],
    players_name: [],              //玩家姓名列表
    createtime: "",                 //该牌局创建时间
    game_data: [],                  //该局的详细数据
    current_sum:[0,0,0,0],          //当前的每个玩家累计剩余牌数
    
    round_addition:[],               //每轮每人添加的牌数（已经过倍数换算）
    isOver:false,                    //该局是否结束
    touch_bottom_tip:"",  //上拉提示信息
    bar_icon_url:"../../icon/bar_chart_active.png",
    line_icon_url:"../../icon/line_chart.png",
    isBarDisplay:"block",
    isLineDisplay:"none",
    last_round_view:"round_0",
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
          var last_round_view = "round_";
          var last_round_num = that.data.game_data.length-1;
          last_round_view += last_round_num;
          that.setData({last_round_view:last_round_view});
      }
    });

    wx.getStorage({
      key: "createtime",
      success: function (res) {
        if(res.data){
          that.setData({ createtime: res.data });
          if (that.data.createtime == "") {
            wx.showLoading({
              title: '正在返回首页',
              mask: true,
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
            })
            setTimeout(function () {
              wx.hideLoading();
              wx.reLaunch({
                url: '../index/index'
              })
            }, 2000);

          } else {
            wx.showLoading({
              title: "载入数据",
              mask: true,
            });
            setTimeout(function () {
              wx.hideLoading();
            }, 1000);
          }
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
    });
    this.ecComponent = this.selectComponent('#echarts_bar');
    this.echarts_init();
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
   * 初始化echarts图表
   */
  echarts_init: function () {
    var that = this;
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart,this.data.players_name,this.data.game_data);

      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;

      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
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
    this.setData({"touch_bottom_tip":"下拉查看更多"});
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
    this.setData({ "touch_bottom_tip": "到顶了" });
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
          that.echarts_init();

          var last_round_view = "round_";
          var last_round_num = that.data.game_data.length - 1;
          last_round_view += last_round_num;
          that.setData({ last_round_view: last_round_view });

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
  },
  changeBar:function(){
    this.setData({'bar_icon_url':"../../icon/bar_chart_active.png"});
    this.setData({ 'line_icon_url': "../../icon/line_chart.png" });
    this.setData({'isBarDisplay':'block'});
    this.setData({ 'isLineDisplay': 'none' });
  },
  changeLine:function(){
    this.setData({ 'line_icon_url': "../../icon/line_chart_active.png" });
    this.setData({ 'bar_icon_url': "../../icon/bar_chart.png" });
    this.setData({ 'isLineDisplay': 'block' });
    this.setData({ 'isBarDisplay': 'none' });
    this.echarts_init();
  },

  /**
   * 提交新一轮剩余牌数
   */
  bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail)

      var current_sum = this.data.current_sum;          //当前每人累计剩余牌数
      var picker_numbers = e.detail.value;    //选择器上的值
      var new_round_data = {};                          //新一轮的数据
      var game_data = this.data.game_data;              //该局完整数据
      var isOver = false;                               //该局是否结束
      var round_addition = this.data.round_addition;    //每轮每人增加的剩余牌数
      var new_addition = [];                            //最新一轮每人增加的牌数
      var winner = 0;                                   //该轮胜利人数,用于检查该轮数据登记是否出错

      //统计选择器上的胜利人数
      for (var index = 0; index < picker_numbers.length; index++) {
          if (picker_numbers[index] == 0) {
              winner++;
          }
      }

      //当胜利人数为0时
      if (winner == 0) {
          wx.showToast({
              title: '没人赢的吗?',
              image: "../../icon/what.png"
          });
          this.setData({current_value_array:[0,0,0,0]});
          return;
      }
      //当胜利人数多于1时
      else if (winner > 1) {
          wx.showToast({
              title: '这么多人赢的吗？',
              image: "../../icon/what.png"
          });
          this.setData({current_value_array: [0, 0, 0, 0]});
          return;
      }

      //根据剩余牌数的不同情况做相应处理
      for (var index = 0; index < current_sum.length; index++) {
          if (picker_numbers[index] == 0) {
              new_round_data[index] = "-";
              new_addition[index] = 0;
          }
          else {
              if (picker_numbers[index] >= 8 && picker_numbers[index] < 10) {
                  picker_numbers[index] *= 2;
              }
              else if (picker_numbers[index] >= 10 && picker_numbers[index] < 13) {
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
      this.setData({ "current_sum": current_sum });
      this.setData({ "game_data": game_data });
      this.setData({ "round_addition": round_addition });
      this.setData({current_value_array:[0, 0, 0, 0]});
      this.echarts_init();
      var last_round_view = "round_";
      var last_round_num = this.data.game_data.length - 1;
      last_round_view += last_round_num;
      this.setData({ last_round_view: last_round_view });


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
      this.setData({current_value_array:[0, 0, 0, 0]});

      //判断每人当前累计剩余牌数，若存在超过或等于100的情况，将该局的状态改为结束
      var loser;
      for (var num in current_sum) {
          if (current_sum[num] >= 100) {
              isOver = true;
              switch(num){
                case '0':loser = this.data.players_name[0];break;
                case '1': loser = this.data.players_name[1]; break;
                case '2': loser = this.data.players_name[2]; break;
                default: loser = this.data.players_name[3]; 
              }
              break;
          }
      }
      this.setData({ "isOver": isOver });
      var endTip = "该局结束,";
      endTip += loser;
      endTip += "累计剩余牌数已破百。"

      if (isOver) {
          wx.showModal({
              // title: '',
              content: endTip,
              showCancel: false,
              cancelText: '',
              cancelColor: '',
              confirmText: '知道了',
              confirmColor: '#07689F',
              success: function (res) { },
              fail: function (res) { },
              complete: function (res) { },
          })
      }
      else {

      }
      wx.setStorage({
          key: "isOver",
          data: isOver
      });
  },
})

/**
 * 
 */
function setOption(chart, names, game_data) {
  var player1_data = [0], player2_data = [0], player3_data = [0], player4_data = [0], round_num = [0];
  var player1_last_round = 0, player2_last_round = 0, player3_last_round = 0, player4_last_round = 0;
  for (var n in game_data) {
    round_num.push(round_num[n] + 1);
    if (game_data[n][0] != "-") {
      player1_data.push(game_data[n][0]);
      player1_last_round = game_data[n][0]
    }
    else {
      player1_data.push(player1_last_round);
    }

    if (game_data[n][1] != "-") {
      player2_data.push(game_data[n][1]);
      player2_last_round = game_data[n][1]
    }
    else {
      player2_data.push(player2_last_round);
    }

    if (game_data[n][2] != "-") {
      player3_data.push(game_data[n][2]);
      player3_last_round = game_data[n][2];
    }
    else {
      player3_data.push(player3_last_round);
    }

    if (game_data[n][3] != "-") {
      player4_data.push(game_data[n][3]);
      player4_last_round = game_data[n][3];
    }
    else {
      player4_data.push(player4_last_round);
    }
  }
  const option = {
    title: {
      text: '',
    },
    legend: {
      data: names,
      right: 0,
      itemWidth: 20,
      top: "2%"
    },
    grid: {
      z: 0,
      top: "15%"
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    // color:'#049bfb',
    xAxis: {
      name: "局\n数",
      type: "category",
      data: round_num,
      // show:false
    },
    yAxis: {
      name: '剩余牌数',
      type: 'value',
      // show:false
    },
    series: [
      {
        name: names[0],
        type: 'line',
        data: player1_data,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: names[1],
        type: 'line',
        data: player2_data,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: names[2],
        type: 'line',
        data: player3_data,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      },
      {
        name: names[3],
        type: 'line',
        data: player4_data,
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        }
      }
    ]
  };

  chart.setOption(option);
}
//end function setOption