
export function processOrderData(data){

  var totalArray = data.data;
  return totalArray;
}

export function getWeekDaysByType(totalArray, type:String){

  var items;
  if (type == 'breakfast') {
    items = getBreakfastWeekDay(totalArray);
  }
  else if (type == 'lunch') {
    items = getLunchWeekDay(totalArray);
  }
  else if(type == 'dinner') {
    items = getDinnerWeekDay(totalArray);
  }
  return items;
}

export function getBreakfastWeekDay(totalArray){
  var items = [];

  totalArray.forEach(function(item, index) {
    //如果不为1,就是不显示的星期几
    if (item.foodsBreakfastStatus == 0)
    {
        return;
    }
    items.push(item);
  });
  return items;
}

export function getLunchWeekDay(totalArray){
  var items = [];

  totalArray.forEach(function(item, index) {
    //如果不为1,就是不显示的星期几
    if (item.foodsLunchStatus == 0)
    {
        return;
    }
    items.push(item);
  });
  return items;
}

export function getDinnerWeekDay(totalArray){
  var items = [];

  totalArray.forEach(function(item, index) {
    //如果不为1,就是不显示的星期几
    if (item.status == 0 || !item.foodsDinnerStatus)
    {
        return;
    }
    items.push(item);
  });
  return items;
}
export function getFoodByTypeAndWeek(totalArray,type:String,weekDay){
  var itemInfo;
  if (type == 'breakfast') {
    itemInfo = getBreakfastFoodByWeek(totalArray,weekDay);
  }
  else if (type == 'lunch') {
    itemInfo = getLunchFoodByWeek(totalArray,weekDay);
  }
  else if(type == 'dinner') {
    itemInfo = getDinnerFoodByWeek(totalArray,weekDay);
  }
  return itemInfo;
}

export function getBreakfastFoodByWeek(totalArray,weekDay){
  var itemInfo;
  var foodItems = [];
  totalArray.forEach(function(item, index) {
    if (item.foodsBreakfastStatus == 0 || item.weekDay != weekDay)
    {
        return;
    }
    itemInfo = item;
    for (var i = 0; i <= item.food.length - 1; i++)
    {
      var itemFood = item.food[i];
      if (itemFood.type == 1)
      {
        foodItems.push(itemFood);
      }
    };

  });
  itemInfo.foodItems = foodItems;
  return itemInfo;
}

export function getLunchFoodByWeek(totalArray,weekDay){
  var itemInfo;
  var foodItems = [];
  totalArray.forEach(function(item, index) {
    if (item.foodsLunchStatus == 0 || item.weekDay != weekDay)
    {
        return;
    }
    itemInfo = item;
    for (var i = 0; i <= item.food.length - 1; i++)
    {
      var itemFood = item.food[i];
      if (itemFood.type == 3)
      {
        foodItems.push(itemFood);
      }
    };

  });
  itemInfo.foodItems = foodItems;
  return itemInfo;
}

export function getDinnerFoodByWeek(totalArray,weekDay){
  var itemInfo;
  var foodItems = [];
  totalArray.forEach(function(item, index) {
    if (item.status == 0 || item.foodsDinnerStatus == 0 || item.weekDay != weekDay)
    {
        return;
    }
    itemInfo = item;
    for (var i = 0; i <= item.food.length - 1; i++)
    {
      var itemFood = item.food[i];
      if (itemFood.type == 2)
      {
        foodItems.push(itemFood);
      }
    };

  });
  itemInfo.foodItems = foodItems;
  return itemInfo;
}

export function getPluseImageByStatus(itemInfo,type) {
  var disableClick;
  if (type == 'breakfast') {
    disableClick = !itemInfo.breakfastBuyStatus || !itemInfo.foodsBreakfastStatus;
  }
  else if (type == 'lunch') {
    disableClick = !itemInfo.lunchBuyStatus || !itemInfo.foodsLunchStatus;
  }
  else if(type == 'dinner') {
    disableClick = !itemInfo.dinnerBuyStatus || !itemInfo.foodsDinnerStatus;
  }

  if (disableClick) {
    return require('../../assets/plus_disable.png')
  }
  return require('../../assets/plus_normal.png');
}

export function getReduceImageByStatus(itemInfo,type) {
  var disableClick;
  if (type == 'breakfast') {
    disableClick = !itemInfo.breakfastBuyStatus || !itemInfo.foodsBreakfastStatus;
  }
  else if (type == 'lunch') {
    disableClick = !itemInfo.lunchBuyStatus || !itemInfo.foodsLunchStatus;
  }
  else if(type == 'dinner') {
    disableClick = !itemInfo.dinnerBuyStatus || !itemInfo.foodsDinnerStatus;
  }
  if (disableClick) {
    return require('../../assets/reduce_disable.png')
  }
  return require('../../assets/reduce_normal.png');
}

export function getSelectedByStatus(item) {
  if (item.num > 0) {
    return true
  }
  return false;
}

export function getCanOrderStatus(item,type) {
  var disableClick;
  if (type == 'breakfast') {
    disableClick = !item.breakfastBuyStatus ? false : true;
  }
  else if (type == 'lunch') {
    disableClick = !item.lunchBuyStatus ? false : true;
  }
  else if(type == 'dinner') {
    disableClick = !item.dinnerBuyStatus ? false : true;
  }
  return disableClick;
}
