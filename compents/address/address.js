// pages/details/details.js
const Promise = require('../../utils/es6-promise.min.js')
var QQMapWX = require('../../utils/qqmap/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'M3CBZ-5LGLJ-GJOFX-KMXGJ-QQJTV-PZF7X' // 必填
});
var app = getApp()

Component({
  /**
   * 页面的初始数据
   */
  data: {
 
    latLongData: {},
    address_detail: '',

  },
  properties: {
    locationArr: {
      type: String,
      value: "",
    }
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
  methods: {
    positionGetAddress(event) {
        var that = this;
        auth().then(function(res){
          if(res){
            location().then(function(latLongData){
              if(latLongData !=null){
                detailAddress(latLongData,that).then(function(addressData){
                  var str = addressData.province+"-"+addressData.city+"-"+addressData.district;
                  that.setData({
                    latLongData: latLongData,
                    locationArr: str,
                    address_detail: addressData.detail.recommend
                  })
    
                  that.triggerEvent('addressData', that.data)
                })
              }
            })
          }
        })
    },
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
 
  }
})

const auth= function () {
  var that = this;
  return new Promise((resolve, reject) => {
    
    wx.getSetting({
        success: (res) => {
    
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
          title: '请求授权当前位置',
          content: '需要获取您的地理位置，请确认授权',
          success: function (res) {
            if (res.cancel) {
            wx.showToast({
              title: '拒绝授权',
              icon: 'none',
              duration: 1000
            })
            resolve(false);
            } else if (res.confirm) {
            wx.openSetting({
              success: function (dataAu) {
              if (dataAu.authSetting["scope.userLocation"] == true) {
                wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1000
                })
                resolve(true);
                //再次授权，调用wx.getLocation的API
              } else {
                wx.showToast({
                title: '授权失败',
                icon: 'none',
                duration: 1000
                })
                resolve( false);
              }
              }
            })
            }
          }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          resolve(true);
        }
        else {
          resolve(true);
        }
        }
      })
   
  })
}

const location= function () {
  return new Promise((resolve, reject) => {
    
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
       var latitude = res.latitude
       var longitude = res.longitude
       resolve({'latitude':latitude,'longitude':longitude}) 
      
      },
      fail: function (res) {
       console.log('fail' + JSON.stringify(res))
       reject(null);
      }
     })
  })
  
 }

 const detailAddress =  function (latLongData,that) {
   
  return new Promise((resolve, reject) => {
     
    qqmapsdk.reverseGeocoder({
    location: {
      latitude: latLongData.latitude,
      longitude: latLongData.longitude
    },
    success: function (res) {
      let province = res.result.ad_info.province
      let city = res.result.ad_info.city
      let district = res.result.ad_info.district
      let detail = res.result.formatted_addresses 
      resolve({'province':province,'city':city,'district':district,'detail':detail})
    },
    fail: function (res) {
      reject(false);
    },
    complete: function (res) {
      reject(false);
    }
    });
  })
 }
module.exports={
  auth,
  location,
  detailAddress

}