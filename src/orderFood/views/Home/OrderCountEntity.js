function CountEntity() {
  this.currentFoodCount = 0;
  this.currentWaterCount = 0;
  this.currentSolidCount = 0;
  this.currentLunchCount = 0;
  this.currentDinnerCount = 0;
};

var OrderCountEntity = {
                    '1':new CountEntity(),
                    '2':new CountEntity(),
                    '3':new CountEntity(),
                    '4':new CountEntity(),
                    '5':new CountEntity(),
                    '6':new CountEntity(),
                    '7':new CountEntity()
                  };

export default OrderCountEntity;
