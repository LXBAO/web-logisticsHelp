 
 
const filterNumber  = value =>{
		return value.toFixed(2)
	 
}
const calculateDateTimeDiff = (start ,end) =>{
    var date1 = new Date(start);
    var date2 = new Date(end);
    const oneMinute = 60 * 1000; // 1 minute in milliseconds
    const diff = Math.abs(date2.getTime() - date1.getTime());
    return diff / oneMinute;
}

const orderStatusMaps = [];
orderStatusMaps[1] = '已下单';
orderStatusMaps[2] = '已接单';
orderStatusMaps[3] = '已支付';
orderStatusMaps[4] = '已取消';
orderStatusMaps[5] = '已拒绝';
orderStatusMaps[6] = '已完成';
const orderStatusStr = (status) =>{
     
    return orderStatusMaps[status];
}
const calculateAmount = (minute,amount) =>{
    var tempAmt = amount / 60;
   
    
    return filterNumber(tempAmt * minute);
}

const convertUTCToLocal= strDate => {
    // 将UTC时间字符串转换为Date对象
    var date = new Date(strDate);
    var timeoffset = (new Date().getTimezoneOffset()) * 60 * 1000;
    var len = date.getTime();
    var date2 = new Date(len - timeoffset);
    return date2;    
}
 

module.exports = {
  calculateDateTimeDiff,
  calculateAmount,
  filterNumber,
  convertUTCToLocal,
  orderStatusStr,
  
}




