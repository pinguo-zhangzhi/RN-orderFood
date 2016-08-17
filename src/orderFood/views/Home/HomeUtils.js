
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

export function updateTotalArray(totalArray,type:String, weekDay,foodItem) {
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
  var updateIndex = 0;
  var newItem;
  totalArray.forEach(function(item, index) {
    if (item.id != itemInfo.id)
    {
        return;
    }
    updateIndex = index;
    for (var i = 0; i <= item.food.length - 1; i++)
    {
      var itemFood = item.food[i];
      if (itemFood.foodId == foodItem.foodId)
      {
         itemFood = foodItem;
      }
    };
    newItem = item;
  });
  totalArray[updateIndex] = newItem;
  var newTotalArray = totalArray;

  return newTotalArray;
}

export function getFoodTypeByState(type) {
  if (type == 'breakfast') {
    return 1;
  }
  else if (type == 'lunch') {
    return 3;
  }
  else {
    return 2;
  }
}

export function getOrderFoodsByFoodItemInfo(fooItemInfo, foodType) {
  var foods = {};
  for (var i = 0; i <= fooItemInfo.food.length - 1; i++)
  {
    var itemFood = fooItemInfo.food[i];
    if (itemFood.num > 0 && itemFood.type == foodType)
    {
      foods[itemFood.foodId] = itemFood.num;
    }
  };
  return foods;
}

export function updateOrderType(totalArray,type:String, weekDay) {
  var itemInfo;
  if (type == 'breakfast') {
    itemInfo = getBreakfastFoodByWeek(totalArray,weekDay);
    itemInfo.breakfastBuyStatus = !itemInfo.breakfastBuyStatus
  }
  else if (type == 'lunch') {
    itemInfo = getLunchFoodByWeek(totalArray,weekDay);
    itemInfo.lunchBuyStatus = !itemInfo.lunchBuyStatus
  }
  else if(type == 'dinner') {
    itemInfo = getDinnerFoodByWeek(totalArray,weekDay);
    itemInfo.dinnerBuyStatus = !itemInfo.dinnerBuyStatus
  }
  var updateIndex = 0;
  totalArray.forEach(function(item, index) {
    if (item.id != itemInfo.id)
    {
        return;
    }
    updateIndex = index;
  });
  totalArray[updateIndex] = itemInfo;
  return totalArray;
}

export function updateCancelOrderType(totalArray,type:String, weekDay) {
  var itemInfo;
  var foodType = getFoodTypeByState(type);
  if (type == 'breakfast') {
    itemInfo = getBreakfastFoodByWeek(totalArray,weekDay);
    itemInfo.breakfastBuyStatus = !itemInfo.breakfastBuyStatus
  }
  else if (type == 'lunch') {
    itemInfo = getLunchFoodByWeek(totalArray,weekDay);
    itemInfo.lunchBuyStatus = !itemInfo.lunchBuyStatus
  }
  else if(type == 'dinner') {
    itemInfo = getDinnerFoodByWeek(totalArray,weekDay);
    itemInfo.dinnerBuyStatus = !itemInfo.dinnerBuyStatus
  }
  for (var i = 0; i <= itemInfo.food.length - 1; i++)
  {
    var itemFood = itemInfo.food[i];
    if (itemFood.type == foodType)
    {
       itemFood.num = 0;
    }
  }
  var updateIndex = 0;
  totalArray.forEach(function(item, index) {
    if (item.id != itemInfo.id)
    {
        return;
    }
    updateIndex = index;
  });
  totalArray[updateIndex] = itemInfo;
  return totalArray;
}
