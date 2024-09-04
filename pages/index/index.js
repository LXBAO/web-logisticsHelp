// index.js

 

// 获取应用实例
const app = getApp()
const tabService = require("../../utils/tab-service");
Page({
  data:{
      userId: '',
    teacherTypes:[
        {id:1,name:'大学生教师'},
        {id:3,name:'职业教师'},
        {id:2,name:'学生家长'},
    ],
    age : [
        {id:0,name:'幼儿'},
        {id:1,name:'小学'},
        {id:2,name:'初中'},
        {id:3,name:'高中'},
    ],
    humanities: [ 
     { id: 2, name: '语文' },
     { id: 3, name: '英语' },
     { id: 7, name: '地理' },
     { id: 8, name: '历史' },
     { id: 9, name: '政治' },
    ],
    science: [
        { id: 1, name: '数学' },
        { id: 4, name: '物理' },
        { id: 5, name: '化学' },
        { id: 6, name: '生物' },
    ],
    art: [
        { id: 11, name: '书法' },
        { id: 12, name: '舞蹈' },
        { id: 13, name: '美术' }
    ],
    images: ['../../image/1.png','../../image/2.jpg','../../image/3.jpg'],
  },
  onLoad: function() {
    var that = this;
    app.userLogin().then(res => {
        
        wx.request({
            url: app.globalData.serverApi + "/user/findUserBy/"+res.openid,
            method: "GET",
             
            header: {
              'content-type': 'application/json' // 默认值
            },
            success (res) {
                if(res.statusCode ==200){
                    app.globalData.userInfo = res.data.data;
                    if(res.data.data.id != null){
                        that.setData({
                            userId: res.data.data.id
                        });
                        if(app.globalData.userInfo.tenantId==2){
                            tabService.updateRole(that, 2)
                            
                        }else{
                            tabService.updateRole(that, 1) 
                        
                        }
                    }else{
                        tabService.updateRole(that, 0) 
                    }
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
      
    })
  
    
  },
   
  teacherListJump(e){
    wx.switchTab({
        url: '../mgt-teacher/list/list'　    
    })
  },
  registryUser: function (e) {
    var id = e.currentTarget.dataset.id

    if(id == 1){
        wx.navigateTo({
            url: '../mgt-teacher/basic-info/index?id=1'　    
        })
    }else if(id==2){
        wx.navigateTo({
            url: '../patriarch/basic-info/index'　    
        })
    }else{
        wx.navigateTo({
            url: '../mgt-teacher/basic-info/index?id=3'　
        })
      
    }
    
     
  

  },
   
  onShow() {
    
    tabService.updateIndex(this, 0)
      
     
   },
})
