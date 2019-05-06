// pages/wrongset/wrongset.js
var commonUtil = require('../../util/common.js');
var app = getApp();
var page = 1;
var dataIsOver = false;

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
    this.onPullDownRefresh();
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
    this.setData({
      list: null
    });
    page = 1;
    dataIsOver = false;
    this.getMyRecord();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (!dataIsOver) {
      page++;
      this.getMyRecord();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  getMyRecord: function() {
    var that = this;
    var data = {};
    var user = wx.getStorageSync("user");
    data.userId = user.id;
    data.page = page;
    commonUtil.doRequest(false, app.constant.getMyRecords, data, function success(res) {
      var reportBeans = res.data.reportBeans;
      if (reportBeans.length == 0) {
        dataIsOver = true;
      } else {
        that.setData({
          ["list[" + (page - 1) + "]"]: res.data.reportBeans
        });
      }
    });
  },

  toTest: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../test/test?wrongSetRecordId=' + id,
    })
  }
})