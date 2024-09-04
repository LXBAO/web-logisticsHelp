
// 获取应用实例
const app = getApp()
const tabService = require("../../../utils/tab-service");
const Promise = require('../../../utils/es6-promise.min.js')
Page({
  data:{
     
    tabTxt: ['教师类别', '可授阶段'],//分类
    tab: [true, true, true],
    types: [{ 'id': '1', 'title': '学生家教' }, { 'id': '3', 'title': '专业教师' }],
    tenantId: 0,//教师类型
    height:'',
    amoumt: 0,//价格
    startAmount: 0,
    endAmount: 0,
    searchName:'',
    age:'',
    currUserId : '',
    maxPage:3,
    show: false,
    currPage: 1,
    pageSize: 5,
    details: []
  },
  onLoad: function() {//默认选了第一个
    
    var that = this;
    if(app.globalData.userInfo.id ){
        this.data.currUserId = app.globalData.userInfo.id;
    }
    loadData(this.data).then(function(res){
        that.setData({details : res.records,maxPage:res.pages});
    })
    wx.getSystemInfo({
        success: (res) => {
           
          that.setData({
            height: res.windowHeight
          })
        }
      })
  },
  onShow() {

    tabService.updateIndex(this, 1)
   
   
  },
  search(){
    this.data.currPage =1;
    if(this.data.searchName =='男'){
        this.data.sex=1
    }else if(this.data.searchName == '女'){
        this.data.sex=2
    }else{
        this.data.userName =  this.data.searchName;
    }
    var that = this;
    loadData(this.data).then(function(res){
        that.setData({details : res.records,sex: '',userName: '',maxPage:res.pages});
         
    })
  },
  bindBlurSearchName(e){
    this.setData({searchName: e.detail.value});
    
  },
  lower() {
    var currPage = this.data.currPage+1;
    var that = this;
   this.setData({currPage:currPage});
     var that = this;
     if(this.data.currPage <= this.data.maxPage ){
        loadData(that.data).then(function(res){
            if(!res.records || res.records.length==0){
                show = true;  
             }
             var data = that.data.details.concat(res.records)
             that.setData({details : data});
        })  
    }
     
   
  },
  openDetail: function(e){

    wx.navigateTo({
        url:'../../order/detail/index?id='+e.currentTarget.dataset.id.id
      })
  },
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },
  filter: function (e) {
    var self = this, id = e.currentTarget.dataset.id, txt = e.currentTarget.dataset.txt, tabTxt = this.data.tabTxt;
    switch (e.currentTarget.dataset.index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          tenantId: id,
          currPage: 1,
          pageSize: 5,
        });
        break;
        case '1':
            tabTxt[1] = txt;
            if(id !='' &&  self.data.tabTxt.length<=2){
                self.data.tabTxt.push('价格区间');
            }else if(id =='' &&  self.data.tabTxt.length > 2){
                self.data.tabTxt.pop();
            }
           
            self.setData({
              tab: [true, true, true],
              tabTxt: tabTxt,
              age: id,
              currPage: 1,
              pageSize: 5,
            });
            
        break;
      case '2':
        tabTxt[2] = txt;
        var start = 0 ,end =0;
        if(id > 0){
            var amt = txt.split("-");
            start = amt[0] , end = amt[1];
        }
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          amoumt: id,
          startAmount: Number(start),
          endAmount: Number(end),
          currPage: 1,
          pageSize: 5,
        });
        break;
     
    }
     
    loadData(this.data).then(function(res){
        self.setData({details : res.records,maxPage:res.pages});
    })
  },
 
})
const loadData= function (params) {
    var data = {
        tenantId: params.tenantId,//教师类型
        startAmount:  params.startAmount,
        endAmount:  params.endAmount,
        searchName: params.searchName,
        age: params.age,
        currUserId: params.currUserId,
        currPage: params.currPage,
        pageSize: params.pageSize,
    };
    return new Promise((resolve, reject) => {
        wx.request({
            url: app.globalData.serverApi + "/user/page",
            data: data,
            method: 'POST',
            header: {
                'content-type': 'application/json' // 默认值
              },
            success(res) {
                if(res.statusCode ==200){
                    var data = res.data.records;
                    if(data){
                        for(var i=0;i<data.length;i++){
                            data[i].subjects = data[i].subjects.split(",");  
                        }
                    }
                    resolve( res.data);
                }else{
                    wx.showToast({
                        title: res.data,
                        icon: 'error',
                    });
                    reject({});
                }
                
            
            },
            fail(e){
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