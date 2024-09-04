
const app = getApp()
const utils = require("../../../utils/util");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    amount: 0,
    address: '',
    assess:'', //积分
    tempmt : '',
    attachmentVOList: [],
    totalAmt : '',
    startTime: '',
    remark:'',
    subjects: [],
    endTime: '',
    ageArrObj:[],
    ageStr: '',
    addressDetail:'',
    assessList: [],//评价
    tenantId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var tt = this;
    wx.request({
        url: app.globalData.serverApi + "/user/find/user/by?id="+options.id,
       
        method: 'GET',
        header: {
            'content-type': 'application/json' // 默认值
          },
        success(res) {
            var data = res.data.data;
            var ageArrObj = [];
            var index = 0;
            if(data.teacherInfoVO.amt > 0){
                var obj = {};
                obj.text = "幼儿";
                obj.amt =  data.teacherInfoVO.amt;
                ageArrObj[index++] = obj; 
            }
            if(data.teacherInfoVO.amt2 > 0){
                var obj = {};
                obj.text = "小学";
                obj.amt =  data.teacherInfoVO.amt3;
                ageArrObj[index++] = obj; 
            }

            if(data.teacherInfoVO.amt3 > 0){
                var obj = {};
                obj.text = "初中";
                obj.amt =  data.teacherInfoVO.amt3;
                ageArrObj[index++] = obj; 
            }

            if(data.teacherInfoVO.amt4 > 0){
                var obj = {};
                obj.text = "高中";
                obj.amt =  data.teacherInfoVO.amt4;
                ageArrObj[index] = obj; 
            }
               
           
            tt.setData({
                patriarchId: app.globalData.userInfo.id,
                teacherId: options.id,
                tenantId:app.globalData.userInfo.tenantId,
                username: data.username,
                assess: app.globalData.userInfo.assess, 
                attachmentVOList: data.attachmentVOList,
                ageArrObj: ageArrObj,
                subjects: data.subjects.split(","),
                address: data.address,
                addressDetail : data.addressDetail,
                assessList: data.assessList
                  
            })
       
        
        }
    })
    
  },
  bindPickerChange(e){
    var obj = this.data.ageArrObj[e.detail.value];
    this.setData({
        amount: obj.amt,
        ageStr: obj.text
      })
  },
  startChange: function (e) {

    this.setData({
        startTime: e.detail.value
    })

    if(this.data.endTime != ''){
        this.calculate();
    }

  },
  calculate : function(){
    var minute = utils.calculateDateTimeDiff(this.data.startTime ,this.data.endTime);
    var totalAmt = utils.calculateAmount(minute,this.data.amount);
    this.setData({
        totalAmt: totalAmt - app.globalData.userInfo.assess,
        tempAmt: totalAmt,
    })
  },
  endChange: function (e) {
    if(e.detail.value <= this.data.startTime){
        wx.showToast({
            title: '结束时间必须大于上门时间',
            icon: 'none',
          });
          return; 
    }
    this.setData({
        endTime: e.detail.value
    })
    if(this.data.startTime != ''){
        this.calculate();
    }
   
    

  },
  getDescription(e){
    this.setData({
        remark: e.detail.value
    })
  },
  submitFrom: function(e){
    if(this.data.startTime == ''){
        wx.showToast({
            title: '上门时间不能未空',
            icon: 'none',
          });
          return; 
    }
    if(this.data.endTime == ''){
        wx.showToast({
            title: '结束时间不能未空',
            icon: 'none',
          });
          return; 
    }
    var data = {};

    data.amount = this.data.totalAmt;
    data.startTime = utils.convertUTCToLocal(this.data.startTime);
    data.endTime = utils.convertUTCToLocal(this.data.endTime);
    data.patriarchId = this.data.patriarchId;
    data.teacherId = this.data.teacherId;
    data.remark = this.data.remark;
    data.ageStr = this.data.ageStr;
    wx.request({
        url: app.globalData.serverApi + "/order/save",
       
        method: 'POST',
        data: data,
        header: {
            'content-type': 'application/json' // 默认值
          },
        success(res) {
            if(res.statusCode ==200){
                wx.showToast({
                    title: '下单成功',
                    icon: 'success',
                });
                app.globalData.isRefresh = true;
                  wx.navigateBack({
                    delta: 1 
                })      
            
            }else{
                wx.showToast({
                    title: res.data,
                    icon: 'error',
                });
            }
            
        },
        fail(e){
            wx.showToast({
                title: '系统异常请稍后再试',
                icon: 'error',
            });
        }
    })

  },
  sendMessage(orderId){
    var data = {character_string1: orderId,thing2: '上门辅导',thing3: app.globalData.userInfo.username ,thing4: this.data.startTime}
    wx.cloud.callFunction({
        name: "Place an order",
        data: {
          openid: openid,
          name: name
        }
      }).then(res => {
        console.log("发送多条成功", res)
      }).catch(res => {
        console.log("发送多条失败", res)
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