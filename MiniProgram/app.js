/*
* app.js
* 小程序逻辑
* 
* @Author: H3ric Young
* @Date:   2018-01-04 14:30:02
* @Last Modified by:   H3ric Young
* @Last Modified time: 2018-01-10 14:39:31
*/


App({
  /**
   * [onLaunch 生命周期函数--监听小程序初始化
   *           当小程序初始化完成时，会触发 onLaunch（全局只触发一次）]
   *           
   * @author Heric
   * @date   2018-01-4
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onLaunch: function () {
    
  },

  /**
   * [onShow 生命周期函数--监听小程序显示
   *         当小程序启动，或从后台进入前台显示，会触发 onShow]
   *         
   * @author Heric
   * @date   2018-01-4
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onShow: function () {
    // console.log('App Show')
  },

  /**
   * [onHide 生命周期函数--监听小程序隐藏
   *         当小程序从前台进入后台，会触发 onHide]
   *         
   * @author Heric
   * @date   2018-01-4
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  onHide: function () {
    // console.log('App Hide')
  },

  /**
   * [error 错误监听函数  
   *        当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息]
   *        
   * @author Heric
   * @date   2018-01-10
   *
   * @access [access]
   * @return {[type]}   [description]
   */
  error:function(){

    // 弹窗提示
    wx.showModal({
      // title: '',
      content: 'O-Oh,出错了',
      showCancel: false,
      cancelText: '',
      cancelColor: '',
      confirmText: '知道了',
      confirmColor: '',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})