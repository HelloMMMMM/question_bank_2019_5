// pages/register/register.js
var commonUtil = require('../../util/common.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      id: 'userName',
      name: '8-16位用户名',
      type: "text",
      maxLength: 16,
      isPassword: false
    }, {
      id: 'password',
      name: '6-12位密码',
      type: "text",
      maxLength: 12,
      isPassword: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  toLogin() {
    wx.navigateBack({
      url: "../login/login"
    })
  },

  checkInput(e) {
    var userName = e.detail.value.userName;
    var password = e.detail.value.password;
    if (!userName || !password || userName.length < 8 || password.length < 6) {
      commonUtil.showToast('请按要求将信息填写完整');
      return false;
    }
    return true;
  },

  register(e) {
    var that = this;
    var data = {};
    data.userName = e.detail.value.userName;
    data.password = e.detail.value.password;
    commonUtil.doRequest(true, app.constant.register, data, function(res) {
      setTimeout(function() {
        that.toLogin();
      }, 500);
    });
  },

  formSubmit(e) {
    if (this.checkInput(e)) {
      this.register(e)
    }
  },
})