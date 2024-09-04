// pages/assess/add.js
const app = getApp()
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fraction:0,
    description: '',
    teacherId: '',
    orderId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({
        teacherId: options.userId,
        orderId: options.orderId
    })
  },
  getDescription: function(e){
  
  this.setData({
    description : e.detail.value
  }) 
},
  chooseicon(e){
    var that = this;
    var id = e.currentTarget.dataset.id+1;
    this.setData({
        fraction: id
    })
  },
  formSubmit(e){
    if (this.data.fraction <= 0) {
        wx.showToast({
          title: '评分不能位空',
          icon: 'none',
        });
        return;
    }
    if (this.data.description.length <= 0) {
        wx.showToast({
          title: '评价不能位空',
          icon: 'none',
        });
        return;
    }

    wx.request({
        url: app.globalData.serverApi + "/assess/save",
        method: "POST",
        data: this.data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            if(res.statusCode ==200){
                wx.showToast({
                    title: '评价成功',
                    icon: 'success',
                });
                const pages = getCurrentPages();
                const prevPage = pages[pages.length - 2];
                wx.navigateBack({
                    delta: 1,
                    success: function (e) {
                        if (prevPage == undefined || prevPage == null) return;
                        // prevPage.onLoad();
                        //关键在这里,这里面是触发上个界面
                        prevPage.onLoad()
        
                    }
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