// pages/order/browse/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName : '',
    imageUrl: '',
    addressDetail: '',
    remark: '',
    subjects : '',
    ageStr: '',
    amount : '',
    startTime: '',
    endTime : '',
    status: '',
    orderId: '',
    phone: '',
    tenantId: '',
    description: '',
    types: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var json = JSON.parse(decodeURIComponent(options.obj))
    if(app.globalData.userInfo.tenantId != 2){
        json.subjects = "";
    }
    
    this.setData({
        tenantId: app.globalData.userInfo.tenantId,
        orderId: json.id,
        userName : json.userName,
        imageUrl: json.imageUrl,
        addressDetail: json.addressDetail,
        subjects : json.subjects.split(","),
        ageStr: json.ageStr,
        phone: json.phone,
        amount : json.amount,
        remark: json.remark,
        startTime: json.startTime,
        endTime : json.endTime,
        status: json.status,
    });
    var that = this;
    if(json.status == '4' || json.status =='5'){
        wx.request({
            url: app.globalData.serverApi + "/orderRemark/find/by/"+json.id,
            
            method: 'GET',
            header: {
                'content-type': 'application/json' // 默认值
              },
            success(res) {
                if(res.statusCode ==200){
                    var data = res.data.data;
                    that.setData({description : data.description,types: data.types});
                }else{
                    wx.showToast({
                        title: res.data,
                        icon: 'error',
                    });
                }
                
            },fail(e){
                wx.showToast({
                    title: '系统异常请稍后再试',
                    icon: 'error',
                });
            }
        });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})