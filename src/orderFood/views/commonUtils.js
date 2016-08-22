export function getFoodList(data) {
    var list = data.data;
  	var foodList;
  	var dayList={};
  	for(var key in list){
  		foodList = list[key];
  	}

  	if (!foodList || foodList.length == 0) {
  		console.log("未查询到任何订单");
  		return;
  	};

    for(var i = 0;i<foodList.length;i++)
    {
      var details = foodList[i];
      if (!dayList[details.DAY]) {
        dayList[details.DAY] = {};
        dayList[details.DAY].DAY = details.DAY;
        dayList[details.DAY].list = [];
      }
      dayList[details.DAY].list.push(foodList[i]);
    }
    console.log("datylist:",dayList);
    return dayList;
}

export function dateToChina(date){
		switch(date){
			case 1:
				return '周一';
			break;
			case 2:
				return '周二';
			break;
			case 3:
				return '周三';
			break;
			case 4:
				return '周四';
			break;
			case 5:
				return '周五';
			break;
			case 6:
				return '周六';
			break;
			case 7:
			case 0:
				return '周日';
			break;
		}
}

export function getFoodNameByName(name){

  switch (name) {
    case '晚餐':
      return require('../assets/wc.png');
      break;
    case '午餐':
      return require('../assets/wc.png');
      break;
    case '馒头':
      return require('../assets/mt.png');
      break;
    case '包子':
    case '大葱猪肉包':
      return require('../assets/bz.png');
      break;
    case '花卷':
    case '香葱椒盐花卷':
      return require('../assets/hj.png');
      break;
    case '豆浆':
      return require('../assets/dj.png');
      break;
    case '鸡蛋':
      return require('../assets/jd.png');
      break;
    case '牛奶':
      return require('../assets/nn.png');
      break;
    case '牛奶（加燕麦）':
      return require('../assets/yanmai.png');
      break;
    case '布里奥斯':
      return require('../assets/blas.png');
      break;
    case '蔓越莓面包':
      return require('../assets/mym.png');
      break;
    case '肉松':
      return require('../assets/rs.png');
      break;
    case '瑞士风':
      return require('../assets/rsf.png');
      break;
    case '三明治':
      return require('../assets/smz.png');
      break;
    case '八宝粥':
      return require('../assets/bbz.png');
      break;
    case '白菜包':
      return require('../assets/bcb.png');
      break;
    case '茶叶蛋':
      return require('../assets/cyd.png');
      break;
    case '稀饭':
      return require('../assets/xf.png');
      break;
    case '香菇肉包':
      return require('../assets/xgrb.png');
      break;
    case '竹笋肉包':
      return require('../assets/zsrb.png');
      break;
    case '银耳粥':
      return require('../assets/yez.png');
      break;
    default:
      return require('../assets/wc.png');
  }
}

export function getWeekDay(dateStr){
    var d = dateStr.substring(dateStr.length-2,dateStr.length);
		var m = dateStr.substring(dateStr.length-4,dateStr.length-2);
		var y = dateStr.substring(0,4);
		var date = new Date(y+"-"+m+"-"+d).getDay();//星期几
    return dateToChina(date);
}

export function getDay(dateStr){
  var d = dateStr.substring(dateStr.length-2,dateStr.length);
  return d;
}

export function getMonth(dateStr){
  var m = dateStr.substring(dateStr.length-4,dateStr.length-2);
  return m + '月';
}
