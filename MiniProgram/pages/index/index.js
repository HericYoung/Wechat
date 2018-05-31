/*
* index.js
* 首页页面逻辑
* 
* @Author: H3ric Young
* @Date:   2018-01-4 14:30:02
* @Last Modified by:   H3ric Young
* @Last Modified time: 2018-01-10 15:25:22
*/

/**
 * Page()函数用来注册一个页面。
 * 接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
 */
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    version:"v0.53",
    createtime: "",   //旧牌局（若存在）的创建时间
  },

  /**
   * [onLoad 生命周期函数--监听页面加载]
   * 一个页面只会调用一次，可以在 onLoad 中获取打开当前页面所调用的 query 参数。
   * 
   * @author Heric
   * @date   2018-01-4
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
   * @date   2018-01-4
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onShow: function () {
    var that = this;

    // 尝试读取本地数据，判断是否有未完成的旧牌局
    // 若存在旧牌局，将该牌局的创建时间存储到页面的data的相应键的值中
    wx.getStorage({
      key: "createtime",
      success: function (res) {
        if (res.data) {
          that.setData({ createtime: res.data });
        }
      }
    });
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
   * [onPullDownRefresh 页面相关事件处理函数--监听用户下拉动作]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onPullDownRefresh:function(){
    
  },


  /**
   * [startGame 进入游戏]
   * @author Heric
   * @date   2018-01-04
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  startGame:function(){
    //判断是否有未完成的旧牌局的数据
    //若有，使用弹窗供用户选择继续进行旧牌局或者新开牌局
    if(this.data.createtime) {
      wx.showModal({
        title: "注意",
        content: "手机存有未完成的牌局，需要继续进行吗？",
        cancelText: "新建",
        // cancelColor:"#07689F",
        confirmColor:"#07689F",
        confirmText: "继续",
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
    else{//没有旧牌局的数据，直接新建牌局
      wx.navigateTo({
        url: '../newGame/newGame',
      })
    }
  },
  showInfo:function(){
      wx.showModal({
          title: '提示',
          content: "感谢使用，这里唠叨几句。\r\n这个不是游戏，算是个计数工具，方便平时玩锄大地时记录各人累计剩余牌数。\r\n这里采用的规则是每局剩余1~7张时按一倍计算，8~9张时2倍，10张3倍，13张4倍。\r\n每轮计算时选择实际剩余牌数即可，程序会自动按相应倍数进行换算。",
          showCancel:false,
          confirmColor: '#07689F',
          success: function (res) {
              if (res.confirm) {
                  console.log('用户点击确定')
              }
          }
      })
  }
})
