// pages/report/report.js
var commonUtil = require('../../util/common.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      recordId: options.recordId,
    });
    this.getReport();
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

  getReport: function() {
    var that = this;
    var data = {};
    data.recordId = this.data.recordId;
    commonUtil.doRequest(false, app.constant.getReport, data, function success(res) {
      that.setData({
        correctCount: res.data.correctCount,
        total: res.data.questionTotal,
        correctRatio: res.data.correctRatio,
        count1: res.data.count1,
        count2: res.data.count2,
        count3: res.data.count3,
        count4: res.data.count4,
      });
    });
  }
})