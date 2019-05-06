var app = getApp();

function showLoading() {
  wx.showLoading({
    title: '请稍候...',
    mask: true,
  })
}

function hideLoading() {
  wx.hideLoading();
}

function showToast(msg) {
  wx.showToast({
    title: msg,
    icon: 'none',
    duration: 1500
  })
}

function doRequest(isPost, childUrl, data, successCallback, failCallback) {
  showLoading();
  wx.request({
    url: app.constant.hostUrl + childUrl,
    data: data,
    method: isPost ? 'POST' : 'GET',
    header: {
      'content-type': isPost ? 'application/x-www-form-urlencoded' : 'application/json'
    },
    success(res) {
      hideLoading();
      var msg = res.data.msg;
      if (msg) {
        showToast(msg);
      }
      if (res.data.code == 1) {
        if (successCallback) {
          successCallback(res);
        }
      } else if (res.data.code == 0) {
        if (failCallback) {
          failCallback(res);
        }
      }
    },
    fail(res) {
      hideLoading();
      showToast(res.errMsg);
    }
  })
}

function getUser() {
  return wx.getStorageSync("user");
}

module.exports = {
  showLoading: showLoading,
  hideLoading: hideLoading,
  showToast: showToast,
  doRequest: doRequest,
  getUser: getUser,
}