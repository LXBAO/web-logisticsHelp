const tabService = require("../../../utils/tab-service");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    phone: '',
    sex: 1,
    address: '',
    addressDetail : '' 
 
  },
   
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    tabService.updateIndex(this, 3);
    this.setData({
        username: app.globalData.userInfo.username,
        phone:  app.globalData.userInfo.phone,
        sex:  app.globalData.userInfo.sex,
        address:  app.globalData.userInfo.address,
        addressDetail :  app.globalData.userInfo.addressDetail
          
    })
    
  },
  edit:function (e){
    wx.navigateTo({
        url:'../basic-info/index' 
    })
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

    tabService.updateIndex(this, 3)
   
   
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