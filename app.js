// app.js

 
const Promise = require('./utils/es6-promise.min.js')
 
 
App({
    globalData: {
      serverApi: 'http://localhost:8082',
      openid: null,
      userInfo: {},
      isRefresh:false,
      
    },
    userLogin: function() {
        var that = this;
        return new Promise(function(resolve, reject){
            wx.login({
                success: res => {
                
                    let code=res.code
                    wx.request({
                    url: `https://api.weixin.qq.com/sns/jscode2session?appid=wxf05a87b9679f2bea&secret=5f6491891341acac31fe9d7b76a5ab9b&js_code=${code}&grant_type=authorization_code`,
                    success:(res)=>{
                        that.globalData.openid = res.data.openid;
                        
                        resolve(res.data);
                    },
                    fail: function(res) {
                        reject(res);
                        wx.showToast({
                        title: '系统错误'})
                    }
                    })
                }
            })
        });
    },
    //获取用户消息推送授权
   getAuthorization(){
    var   tmplIds= [  
    'SDazq_P9lAe_Uudex9ut2lEo70e_N96UCNbDkG4jvsk' ];
    wx.showModal({
        title: '提示',
        content:'请授权开通服务通知',
        showCancel: true,
        success: function (ress) {
          if (ress.confirm) {  
            wx.requestSubscribeMessage({   // 调起消息订阅界面
              tmplIds: tmplIds,
              success (res) { 
                console.log('订阅消息 成功 ');
                console.log(res);
              },
              fail (er){
                console.log("订阅消息 失败 ");
                console.log(er);
              }
            })     
                  
          }
        }
      })
    },  
    onLaunch() {
      
    },

   
  
// 全局引入方法，简便引入第三方包
//require: ($url)=> require($url)

})
