const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    types: '',
    id: '',
    oldStatus: '',
    description: '',
    cancelArr:[
        {id:0,name:'临时有事'},
        {id:1,name:'地址写错了'},
        {id:2,name:'电话写错了'},
        {id:3,name:'忘写备注'},
        {id:4,name:'下错单了'},
        {id:5,name:'其他原因'}
    ],
    rejectArr: [
        {id:0,name:'临时有事'},
        {id:1,name:'地址太远'},
        {id:2,name:'年纪不适'},
        {id:3,name:'科目不适'},
        {id:4,name:'价格太低'},
        {id:5,name:'其他原因'}
    ],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      this.setData({
        orderId : options.orderId,
        types: options.types,
        oldStatus: options.status
      
      })
    ;
  },
  getDescription: function(e){
  
    this.setData({
      description : e.detail.value
    }) 
  },
  radioChanged(e){
    var id = e.detail.value;
    var str = "";
    if(this.data.types ==1){
        str = id=='5' ? '': this.data.rejectArr[id].name;
    }else{
        str = id=='5' ? '': this.data.cancelArr[id].name;
    }
  
    this.setData({
        id : id,
        description : str,
      }) 
  },
  formSubmit(e){
    var str="", url="";
    if(this.data.types == 1){
        str = "拒绝原因不能为空";
        url = app.globalData.serverApi + "/order/reject";
    }else{
        str = "取消原因不能为空"
        url = app.globalData.serverApi + "/order/cancel";
    }
     
      
    if (this.data.description.length <= 0) {
        wx.showToast({
          title: str,
          icon: 'none',
        });
        return;
    }
    var fromData = {
        orderId: this.data.orderId,
        types: this.data.types,
        oldStatus: this.data.oldStatus,
        description: this.data.description
    };
    wx.request({
        url: url,
        method: "POST",
        data: fromData,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
            if(res.statusCode ==200){
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
                    icon: 'success',
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