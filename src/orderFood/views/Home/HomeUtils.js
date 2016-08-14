
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
  var items;
  if (type == 'breakfast') {
    items = getBreakfastFoodByWeek(totalArray,weekDay);
  }
  else if (type == 'lunch') {
    items = getLunchFoodByWeek(totalArray,weekDay);
  }
  else if(type == 'dinner') {
    items = getDinnerFoodByWeek(totalArray,weekDay);
  }
  return items;
}

export function getBreakfastFoodByWeek(totalArray,weekDay){
  var foodItems = [];
  totalArray.forEach(function(item, index) {
    if (item.foodsBreakfastStatus == 0 || item.weekDay != weekDay)
    {
        return;
    }
    for (var i = 0; i < item.food.length - 1; i++)
    {
      var itemFood = item.food[i];
      if (itemFood.type == 1)
      {
        foodItems.push(itemFood);
      }
    };

  });
  return foodItems;
}

export function getLunchFoodByWeek(totalArray,weekDay){
  var foodItems = [];
  totalArray.forEach(function(item, index) {
    if (item.foodsLunchStatus == 0 || item.weekDay != weekDay)
    {
        return;
    }
    for (var i = 0; i < item.food.length - 1; i++)
    {
      var itemFood = item.food[i];
      if (itemFood.type == 3)
      {
        foodItems.push(itemFood);
      }
    };

  });
  return foodItems;
}

export function getDinnerFoodByWeek(totalArray,weekDay){
  var foodItems = [];
  totalArray.forEach(function(item, index) {
    if (item.status == 0 || item.foodsDinnerStatus == 0 || item.weekDay != weekDay)
    {
        return;
    }
    for (var i = 0; i < item.food.length - 1; i++)
    {
      var itemFood = item.food[i];
      if (itemFood.type == 2)
      {
        foodItems.push(itemFood);
      }
    };

  });
  return foodItems;
}
