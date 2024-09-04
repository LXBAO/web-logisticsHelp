 
const app = getApp()
const tabService = require("../../../utils/tab-service");
const Promise = require('../../../utils/es6-promise.min.js')
const utils = require('../../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currPage: 1,
    pageSize: 5,
    maxPage : '',
    details: [],
    height: '',
    patriarchId: 0,
    teacherId: 0,
    tenantId:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    var that = this;
    
      if(app.globalData.userInfo.tenantId == 2){
        
        this.data.patriarchId = app.globalData.userInfo.id;
        
      }else{
      
        this.data.teacherId = app.globalData.userInfo.id;
     }
        
   
      
    loadData(this.data).then(function(res){
        that.setData({tenantId: app.globalData.userInfo.tenantId,details : res.records, maxPage : res.pages});
    })
    wx.getSystemInfo({
        success: (res) => {
           
          that.setData({
            height: res.windowHeight
          })
        }
      })
  },
  openDetail(e){
    wx.navigateTo({
            url:'../browse/index?obj='+encodeURIComponent(JSON.stringify(e.currentTarget.dataset.id))
        })
   
  },
  //取消
  cancel(e){
    var orderId = e.currentTarget.dataset.id.id;
    var status = e.currentTarget.dataset.id.status;
    wx.navigateTo({
        url:'../remark/remark?status='+status+"&orderId="+orderId+"&types="+2
      })
  },
  //接单
  ordersTaking(e){
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.request({
        url: app.globalData.serverApi + "/order/taking/"+id,
        
        method: 'GET',
        header: {
            'content-type': 'application/json' // 默认值
          },
        success(resData) {
            if(resData.statusCode ==200){
                loadData(that.data).then(function(res){
                    that.setData({details : res.records,maxPage : res.pages});
                })
            }else{
                wx.showToast({
                    title: resData.data,
                    icon: 'error',
                });
            }
             
        
        },fail(e){
            console.log(e)
        }
    });
  },
  //拒绝
  rejectOrder(e){
    var orderId = e.currentTarget.dataset.id.id;
    var status = e.currentTarget.dataset.id.status;
    wx.navigateTo({
        url:'../remark/remark?status='+status+"&orderId="+orderId+"&types="+1
      })
  },
  //评价
  openAssess(e){
    var userId = e.currentTarget.dataset.id.userId;
    var id = e.currentTarget.dataset.id.id;
    wx.navigateTo({
        url:'../../assess/add?userId='+userId+"&orderId="+id
      })
  },
  lower() {
    var currPage = this.data.currPage+1;
    var that = this;
   this.setData({currPage:currPage});
   if(this.data.currPage <= this.data.maxPage ){
       loadData(that.data).then(function(res){
           var data = that.data.details.concat(res.records)
           that.setData({details : data});
       })  
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
     var that = this;
    tabService.updateIndex(this, 2)
    if(app.globalData.isRefresh){
        loadData(this.data).then(function(res){
            that.setData({tenantId: app.globalData.userInfo.tenantId,details : res.records, maxPage : res.pages});
        })
        app.globalData.isRefresh = false;
    }
    
   
    
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
 
const loadData= function (params) {
    var data = { currPage: params.currPage,
        pageSize: params.pageSize,
        patriarchId: params.patriarchId,
        teacherId: params.teacherId,
        tenantId: params.tenantId};
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.globalData.serverApi + "/order/page",
            data: data,
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
              },
            success(res) {
                if(res.statusCode ==200){
                    resolve( res.data);
                }else{
                    wx.showToast({
                        title: res.data,
                        icon: 'error',
                    });
                    reject({});
                }
               
            
            },fail(e){
                wx.showToast({
                    title: '系统异常请稍后再试',
                    icon: 'error',
                });
            }
        })
    });
}
module.exports={
    loadData
  
  }