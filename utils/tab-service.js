let tabData = {
    tabIndex: 0,//底部按钮高亮下标
    tabBar: {
        custom: true,
        color: "#5F5F5F",
        selectedColor: "#07c160",
        backgroundColor: "#F7F7F7",
        list: []
    }
  }
  
  // 更新菜单
  const updateRole = (that, type) => {
    //这里设置权限（分2种权限，权限1显示1，2，3；权限2显示4，5，6，7；）
   if (type == 1) {
      tabData.tabBar.list=[
        {
            "pagePath": "/pages/index/index",
            "text": "首页",
            "iconPath": "/image/home.jpg",
            "selectedIconPath": "/image/home2.jpg"
          },
          {
           
            "pagePath": "/pages/mgt-teacher/list/list",
            "text": "老师",
            "iconPath": "/image/laoshi.jpg",
            "selectedIconPath": "/image/laoshi2.jpg"
          },
          {
            
            "pagePath": "/pages/order/list/list",
            "text": "订单",
            "iconPath": "/image/order.png",
              "selectedIconPath": "/image/order2.jpg"
          },
          {
            
            "pagePath": "/pages/mgt-teacher/browse/index",
            "text": "我的",
            "iconPath": "/image/center.jpg",
              "selectedIconPath": "/image/center2.jpg"
          }
      ]
    }else if(type == 0) {
      tabData.tabBar.list=[
        {
            "pagePath": "/pages/index/index",
            "text": "首页",
            "iconPath": "/image/home.jpg",
            "selectedIconPath": "/image/home2.jpg"
          },
          {
         
            "pagePath": "/pages/mgt-teacher/list/list",
            "text": "老师",
            "iconPath": "/image/laoshi.jpg",
            "selectedIconPath": "/image/laoshi2.jpg"
          } 
          
          ]
    } 
    else  {
        tabData.tabBar.list=[
          {
              "pagePath": "/pages/index/index",
              "text": "首页",
              "iconPath": "/image/home.jpg",
              "selectedIconPath": "/image/home2.jpg"
            },
            {
           
              "pagePath": "/pages/mgt-teacher/list/list",
              "text": "老师",
              "iconPath": "/image/laoshi.jpg",
              "selectedIconPath": "/image/laoshi2.jpg"
            },
            
            {
              
              "pagePath": "/pages/order/list/list",
              "text": "订单",
              "iconPath": "/image/order.png",
                "selectedIconPath": "/image/order2.jpg"
            } ,{
         
          "pagePath": "/pages/patriarch/browse/index",
          "text": "我的信息",
          "iconPath": "/image/center.jpg",
          "selectedIconPath": "/image/center2.jpg"
        }]
      } 
    updateTab(that);
  }
   
  // 更新底部高亮
  const updateIndex = (that, index) => {
    tabData.tabIndex = index;
    updateTab(that);
  }
   
  // 更新Tab状态
  const updateTab = (that) => {
    if (typeof that.getTabBar === 'function' && that.getTabBar()) {
        that.getTabBar().setData(tabData);
    }
  }
   
  // 将可调用的方法抛出让外面调用
  module.exports = {
    updateRole, updateTab, updateIndex,tabBar:tabData.tabBar.list
  }
   