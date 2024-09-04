const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    phone: '',
    flag:1,
    tenantId:2,
    sex: 1,
    openid: '',
    attachmentVOList: [],
    address: '',
    longitude:'',
    latitude: '',
    addressDetail : '',
    card1: '../../../image/card1.png',
    card2: '../../../image/card2.png',
    userId: 0,
    text : '提 交'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad( ) {
    
    if(app.globalData.userInfo.id){
        this.setData({
        text : '保 存',
        username: app.globalData.userInfo.username,
        userId: app.globalData.userInfo.id,
        phone: app.globalData.userInfo.phone,
        flag: app.globalData.userInfo.flag,
        tenantId:2,
        sex: app.globalData.userInfo.sex,
        openid: app.globalData.openid,
        address: app.globalData.userInfo.address,
        longitude:app.globalData.userInfo.longitude,
        latitude: app.globalData.userInfo.latitude,
        addressDetail : app.globalData.userInfo.addressDetail,
    })
    }else{
        this.setData({
            openid : app.globalData.openid
        })
    }
  },
  detailedAddressInput: function(e){
      console.log(e.detail.value)
    this.setData({
        addressDetail : e.detail.value
    }) 
  },
  formSubmit: function(e){
    var url = "/user/savePatriarch";
    if(app.globalData.userInfo.id !=null ){
      url = "/user/updatePatriarch";
      this.data.id = app.globalData.userInfo.id;
    }else{
        if (this.data.card1.indexOf("http") == -1) {
            wx.showToast({
              title: '请上传身份证正面',
              icon: 'none',
            });
            return;
        }
        if (this.data.card2.indexOf("http") == -1) {
            wx.showToast({
              title: '请上传身份证反面',
              icon: 'none',
            });
            return;
        }
    }
    const formData = e.detail.value;
    console.log('表单数据：', formData);
    
    if (formData.username.length==0) {
        wx.showToast({
          title: '姓名不能位空',
          icon: 'none',
        });
        return;
    }
    this.data.username = formData.username;
    const phoneReg = /^1[3456789]\d{9}$/;
    if (!phoneReg.test(formData.phone)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none',
      });
      return;
    }
    this.data.phone = formData.phone;
    if (this.data.address.length==0) {
        wx.showToast({
            title: '地址不能位空',
            icon: 'none',
          });
          return; 
    }
   
    if (this.data.addressDetail.length==0) {
        wx.showToast({
            title: '详细地址不能位空',
            icon: 'none',
          });
          return; 
    }
    
     
     
    wx.request({
      url: app.globalData.serverApi + url,
      method: "POST",
      data: this.data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        if(res.statusCode ==200){

            app.globalData.userInfo = res.data.data;
            wx.reLaunch({
                url:'../../index/index'
            })
        }else{
            wx.showToast({
                title: res.data,
                icon: 'error',
            });
        }
        
      },
      fail(res) {
        wx.showToast({
            title: '系统异常请稍后再试',
            icon: 'error',
        });
      }
    })
  
  },
  radioChange(e) { // 单选
    
    this.setData({
      sex: e.detail.value
    })
  },
  getAddressData : function(e){
    this.setData({
      address: e.detail.locationArr,
      longitude: e.detail.latLongData.longitude,
      latitude: e.detail.latLongData.latitude,
      addressDetail: e.detail.address_detail
    })
  },

  uploadAttachment : function(e){
    var that = this;
    var type = e.currentTarget.dataset.id;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],//原图
      sourceType: [ 'album','camera'],//支持选取图片
      success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths[0];
          //上传图片
          wx.uploadFile({

              //请求后台的路径
              url: app.globalData.serverApi+'/attachment/upload',

              //小程序本地的路径
              filePath: tempFilePaths,

              //后台获取我们图片的key
              name: 'file',
              responseType: 'json',
              //额外的参数formData
              formData: {},
              success: function (res) {
                if(res.statusCode ==200){
                   var resData = JSON.parse(res.data).data;
                   if(type==1){
                        that.setData({
                        card1 : app.globalData.serverApi+"/" +resData.path
                        });
                        that.data.attachmentVOList[0] = {'path': app.globalData.serverApi+"/"+resData.path,'url':resData.url};
                   }else{
                        that.setData({
                            card2 : app.globalData.serverApi+"/" +resData.path
                        });
                        that.data.attachmentVOList[1] = {'path': app.globalData.serverApi+"/"+resData.path,'url':resData.url};
                   }
                  
                }else{
                    wx.showToast({
                        title: res.data,
                        icon: 'error',
                    });
                }
                
              },
              fail: function (res) {
                wx.showToast({
                    title: '系统异常请稍后再试',
                    icon: 'error',
                });
              },
           })
        }
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