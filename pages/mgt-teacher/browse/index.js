const tabService = require("../../../utils/tab-service");
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    tenantId:1,
    trial: 0,
    subjects:[],
    process:0,
    phone: '',
    flag:1,
    amount: 99.00,
    sex: 1,
    openid: '',
    address: '',
    longitude:'',
    latitude: '',
    ageStrArr: ['幼儿','小学','初中','高中'],
    attachmentVOList :[],
    items: [],
    teacherInfoVO: {},
    imageUrl: '',
    addressDetail :'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
 
    if(!Array.isArray(app.globalData.userInfo.subjects)){
        app.globalData.userInfo.subjects = app.globalData.userInfo.subjects.split(",");
    }
    
  
    this.setData({
        items : app.globalData.userInfo.infoList,
        username: app.globalData.userInfo.username,
        phone: app.globalData.userInfo.phone,
        attachmentVOList: app.globalData.userInfo.attachmentVOList,
        imageUrl: app.globalData.userInfo.imageUrl,
        subjects: app.globalData.userInfo.subjects,
        amount: app.globalData.userInfo.amount,
        teacherInfoVO:app.globalData.userInfo.teacherInfoVO,
        sex: app.globalData.userInfo.sex,
      
        address: app.globalData.userInfo.address,
        
        addressDetail : app.globalData.userInfo.addressDetail,
  
          
    })
  },
  edit:function (e){
    wx.navigateTo({
        url:'../basic-info/index' 
      })
  },
  onShow() {

    tabService.updateIndex(this, 3)

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