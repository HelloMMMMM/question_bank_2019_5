// pages/test/test.js
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
    if (options.wrongSetRecordId) {
      this.setData({
        wrongSetRecordId: options.wrongSetRecordId,
      });
    }
    this.getQuestion();
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
    //不是复习错题，自动提交
    if (!this.data.wrongSetRecordId) {
      if (!this.data.isCommit) {
        this.commit();
      }
    }
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

  getQuestion: function() {
    var that = this;
    var user = wx.getStorageSync("user");
    var data = {};
    if (this.data.wrongSetRecordId) {
      //复习错题
      data.wrongSetRecordId = this.data.wrongSetRecordId;
    } else {
      //正常答题
      data.userId = user.id;
    }
    commonUtil.doRequest(false, app.constant.getQuestion, data, function success(res) {
      that.setData({
        questions: res.data.questions,
        questionsCount: res.data.questions.length,
        currentQuestionIndex: res.data.startIndex + 1,
        currentQuestion: res.data.questions[res.data.startIndex],
        optionAnswer: [
          null, null, null, null
        ],
        recordId: res.data.recordId,
        answerIndex: 0,
      });
      if (that.data.recordId) {
        commonUtil.showToast("上次答题未完成，继续答题");
      }
    });
  },

  //提交,显示解析，不可再选择,并保存答案
  submit: function() {
    var isCorrect = this.data.currentQuestion.answer == this.data.yourAnswer;
    var canCommit = this.data.currentQuestionIndex == this.data.questionsCount;
    this.setData({
      showParse: true,
      isCorrect: isCorrect,
      ["answers[" + this.data.answerIndex + "]"]: this.data.yourAnswer,
      ["correct[" + this.data.answerIndex + "]"]: isCorrect ? 1 : 2,
      answerIndex: this.data.answerIndex + 1,
      canCommit: canCommit,
    });
  },

  //下一题
  nextQuestion: function() {
    var currentIndex = this.data.currentQuestionIndex + 1;
    if (currentIndex <= this.data.questionsCount) {
      var questions = this.data.questions;
      this.setData({
        currentQuestionIndex: currentIndex,
        currentQuestion: questions[currentIndex - 1],
        showParse: false,
        yourAnswer: null,
        optionAnswer: [null, null, null, null],
      });
    }
  },

  //设置当前题目你的答案，仍未提交时
  setYourAnswer: function(e) {
    var index = e.currentTarget.dataset.index;
    var option = e.currentTarget.dataset.option;
    if (this.data.currentQuestion.type == 1) {
      //单选，重置所有选择
      this.setData({
        optionAnswer: [null, null, null, null],
      });
      //设置这次的选择
      this.setData({
        ["optionAnswer[" + index + "]"]: option,
      });
    } else if (this.data.currentQuestion.type == 2) {
      //多选，根据现在的值取反即为选中或取消
      var hasSelected = this.data.optionAnswer[index];
      this.setData({
        ["optionAnswer[" + index + "]"]: hasSelected ? null : option,
      });
    }
    //清除上次设置的答案
    this.setData({
      yourAnswer: null,
    });
    //取出这次的答案
    var yourAnswer = "";
    for (var i = 0; i < 4; i++) {
      if (this.data.optionAnswer[i]) {
        yourAnswer = yourAnswer + this.data.optionAnswer[i] + ",";
      }
    }
    //清除最后一个,
    yourAnswer = yourAnswer.substring(0, yourAnswer.length - 1);
    //设置答案
    this.setData({
      yourAnswer: yourAnswer,
    });
    console.log(this.data.yourAnswer);
  },



  //提交答题到服务器，未做完退出或者做完自动提交
  commit: function() {
    var that = this;
    var user = wx.getStorageSync("user");
    var data = {};
    data.userId = user.id;
    data.recordId = this.data.recordId ? this.data.recordId : 0;
    //拼接题目id
    var questionIds = "";
    for (var i = 0; i < this.data.questions.length; i++) {
      questionIds = questionIds + this.data.questions[i].id + ",";
    }
    questionIds = questionIds.substring(0, questionIds.length - 1);
    data.questionIds = questionIds;
    //拼接答案
    var answers = "";
    if (this.data.answers) {
      for (var i = 0; i < this.data.answers.length; i++) {
        if (this.data.answers[i]) {
          answers = answers + this.data.answers[i] + "|";
        }
      }
      answers = answers.substring(0, answers.length - 1);
      data.answers = answers;
    }
    //拼接是否正确
    var correctOrWrong = "";
    if (this.data.correct) {
      for (var i = 0; i < this.data.correct.length; i++) {
        if (this.data.correct[i]) {
          correctOrWrong = correctOrWrong + this.data.correct[i] + ",";
        }
      }
      correctOrWrong = correctOrWrong.substring(0, correctOrWrong.length - 1);
      data.correctOrWrong = correctOrWrong;
    }

    commonUtil.doRequest(true, app.constant.addOrUpdateRecord, data, function success(res) {
      that.setData({
        isCommit: true,
      });
      if (that.data.commitByMyself) {
        wx.redirectTo({
          url: '../report/report?recordId=' + res.data.recordId,
        })
      }
    })
  },

  toReport: function() {
    this.setData({
      commitByMyself: true,
    });
    this.commit();
  },

  exitTest: function() {
    wx.navigateBack({
      url: '../wrongset/wrongset',
    })
  }
})