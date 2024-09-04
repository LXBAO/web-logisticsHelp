
// 获取应用实例
const app = getApp()

Page({
  data:{
    username:'',
    tenantId:1,
    trial: 0,
    subjects:[],
    process:0,
    phone: '',
    flag:1,
    teacherInfoVO: {amt: '',amt2: '',amt3: '',amt4: ''},
    sex: 1,
    openid: '',
    address: '',
    longitude:'',
    latitude: '',
    attachmentVOList :[],
    imageUrl: '',
    addressDetail :'',
    text : '提 交',
     
    items: [
      {
          "name": "1",
          "value": "数学"
      }, 
      {
          "name": "2",
          "value": "语文"
      },
      {
        "name": "3",
        "value": "英语"
      } ,{
        "name": "4",
        "value": "物理"
      },
      {
        "name": "5",
        "value": "化学"
      },
      {
        "name": "6",
        "value": "生物"
      },{
        "name": "7",
        "value": "地理"
      },
      {
        "name": "8",
        "value": "历史"
      },
      {
        "name": "9",
        "value": "政治"
      },
      { "name": 11, "value": '书法' },
      { "name": 12, "value": '舞蹈' },
      { "name": 13, "value": '美术' }
  ]
  },
  onLoad: function(open) {//默认选了第一个
  
    if(app.globalData.userInfo.id){
        this.setData({
        text : '保 存',
      
        teacherInfoVO:app.globalData.userInfo.teacherInfoVO,
        username: app.globalData.userInfo.username,
        phone: app.globalData.userInfo.phone,
        attachmentVOList: app.globalData.userInfo.attachmentVOList,
        imageUrl: app.globalData.userInfo.imageUrl,
        subjects: app.globalData.userInfo.subjects,
        
        flag: app.globalData.userInfo.flag,
        tenantId:app.globalData.userInfo.tenantId,
        sex: app.globalData.userInfo.sex,
        openid: app.globalData.openid,
        address: app.globalData.userInfo.address,
        longitude:app.globalData.userInfo.longitude,
        latitude: app.globalData.userInfo.latitude,
        tenantId: app.globalData.userInfo.tenantId,
        addressDetail : app.globalData.userInfo.addressDetail,
    })
    }else{
        this.setData({
            openid : app.globalData.openid,
            tenantId: open.id
        })
    }


  },
   
  checkAmount :  function(e){
    var name = e.currentTarget.dataset.id;
    this.data.teacherInfoVO[name] =  Number(e.detail.value).toFixed(2);
    
  },
  //男，女选项
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
  
  deleteImg: function (e) {

    var attachmentVOList = this.data.attachmentVOList;

    var index = e.currentTarget.dataset.index;

    attachmentVOList.splice(index, 1);

    this.setData({

      attachmentVOList: attachmentVOList

    });

  },
  checkboxAgeChange: function(e){
    this.setData({
        ages : e.detail.value  //单个选中的值
    })
  },
  checkboxChange: function (e) {
     
    this.setData({
        subjects: e.detail.value  //单个选中的值
    })
  },
  formSubmit: function(e){
    var url = "/user/saveTeacher";
    if(app.globalData.userInfo.id !=null ){
      url = "/user/updateTeacher";
      this.data.id = app.globalData.userInfo.id;
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

    if (this.data.tenantId ==1 &&  this.data.addressDetail.length==0) {
        wx.showToast({
            title: '详细地址不能位空',
            icon: 'none',
          });
          return; 
    }
    
   
    if (this.data.teacherInfoVO.amt < 1 &&  this.data.teacherInfoVO.amt2 < 1 
        && this.data.teacherInfoVO.amt3  < 1 && this.data.teacherInfoVO.amt4 < 1 ) {
        wx.showToast({
            title: '辅导金额不能为空',
            icon: 'none',
          });
        return; 
    }

        
         
       
  
    if (this.data.subjects.length < 1) {
        wx.showToast({
            title: '可授科目不能为空',
            icon: 'none',
          });
          return; 
    }
    this.data.subjects = this.data.subjects.sort((a, b) => Number(a) - Number(b)).join(",");
    var copyData = Object.assign({}, this.data);
     copyData.items= [];
     
    
    wx.request({
      url: app.globalData.serverApi + url,
      method: "POST",
      data: copyData,
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
            icon: 'none',
        });
      }
    })

  },

  // 预览图片

  previewImg: function (e) {

    //获取当前图片的下标

    var index = e.currentTarget.dataset.index;

    //所有图片

    var attachmentVOList = this.data.attachmentVOList;

    wx.previewImage({

      //当前显示图片

      current: attachmentVOList[index],

      //所有图片

      urls: attachmentVOList

    })

  },

  detailedAddressInput: function(e){
    console.log(e.detail.value)
  this.setData({
      addressDetail : e.detail.value
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
                       imageUrl : app.globalData.serverApi+"/" +resData.path
                     });
                    }else{
                      that.data.attachmentVOList.push( {'path': app.globalData.serverApi+"/"+resData.path,'url':resData.url});
                      that.setData({
                       attachmentVOList : that.data.attachmentVOList
                     })
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
  }
})
