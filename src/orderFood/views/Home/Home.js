'use strict';

import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  AlertIOS,
  AsyncStorage,
  ActivityIndicator,
  NavigationExperimental
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'
import * as CommonUtils from '../commonUtils'
import * as HomeUtils from './HomeUtils'
import OrderCountEntity from './OrderCountEntity'

var Storage_UserId_Key = 'Storage_UserId_Key';
var Storage_UserEmail_Key = 'Storage_UserEmail_Key';
var Storage_PushToken_Key = 'Storage_PushToken_Key';

var deviceInfo = require('react-native');
var {Platform} = deviceInfo;
var deviceOS = Platform.OS;

const Button = ({title, onPress, isSelected}) => (
  <TouchableOpacity
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={isSelected?styles.buttonSelected:styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const WeekButton = ({title, onPress, isSelected,isBuyState}) => (
  <TouchableOpacity
    onPress={onPress}
    style={isBuyState? styles.weekDayBuyed : (isSelected?styles.weekDaySelected:styles.weekDay)}>
      <Text style={isBuyState? styles.weekDayTextSelected : (isSelected?styles.weekDayTextSelected:styles.weekDayText)}>{title}</Text>
  </TouchableOpacity>
)

const OrderButton = ({title, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.orderBtnStyle}>
      <Text style={styles.orderBtnText}>{title}</Text>
  </TouchableOpacity>
)

const OrderView = ({viewImage, viewStyle,selectedState, plusePress,pluseImage,reduePress,reduceImage, title, countNum}) =>(
  <View style = {viewStyle}>
      <Image style={styles.foodStyle}  source={viewImage} />
      <Image style={selectedState?styles.seletedStyle:styles.unseletedStyle}  source={require('../../assets/selected_mask.png')} />
      <TouchableOpacity  onPress={reduePress}>
           <Image style={styles.actionImage} source={reduceImage}  />
      </TouchableOpacity>
      <Text style = {styles.orderCountText}>{countNum}</Text>
      <TouchableOpacity  onPress={plusePress}>
           <Image style={styles.actionImage} source={pluseImage} />
      </TouchableOpacity>
      <Text style = {styles.orderFoodNameText}>{title}</Text>
  </View>
)

var requestTotalArray = [];
var loginEmail,pushToken,loingUserId;

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      totalArray:[],
      orderState:'breakfast',
      selectedWeekDay:999,
      westFoodMaxCount:2,
      chinaFoodMaxCount:3,
      lunchOrDinnerMaxCount:1,
      maxWaterCount:1,
      weekDayFoodCountEntity:OrderCountEntity
    }
  }
  componentWillMount(){

  }
  componentDidMount(){
    AsyncStorage.multiGet([Storage_UserEmail_Key,Storage_PushToken_Key,Storage_UserId_Key])
          .then((value) => {
            if (value !== null){
              loginEmail = value[0][1];
              pushToken = value[1][1];
              loingUserId = value[2][1];
              this._beginRquestData();
            } else {
              console.log('AsyncStorage fail' )
            }
          })
          .catch((error) => console.log('AsyncStorage error: ' + error.message))
          .done();
  }
  _beginRquestData(){
    var _this = this;
    fetch('https://oatest.camera360.com/orderfood/order/GetAllowTime', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: loginEmail,
            pushToken: pushToken,
            platform:'ios'
        })
    })
    .then(function(response){
      var __this = _this;
      response.json().then(data => {
        var ___this = __this;
        ___this._handlerRequestDataSuccess(data);
      });
    });
  }
  _handlerRequestDataSuccess(data){
    requestTotalArray = HomeUtils.processOrderData(data);
    this.setState({totalArray:requestTotalArray});
  }
  ////////pressHandler////////
  _onPress(){
    this.props.popView(true);//pod
 }
  _onPressDinner(){
    this.setState({orderState:'dinner',selectedWeekDay:999});
  }
  _onPressMidDinner(){
    this.setState({orderState:'lunch',selectedWeekDay:999});
  }
  _onPressBreakfast(){
    this.setState({orderState:'breakfast',selectedWeekDay:999});
  }
  _onPressMyOrder(){
    this.props.pushView(OFNavigationType_list,true);
  }
  _onPressWeekDay(pressDay){
    this.setState({selectedWeekDay:pressDay});
  }
  _onPressPlus(foodInfo){
    var weekItems = HomeUtils.getWeekDaysByType(this.state.totalArray,this.state.orderState);
    var currentSelectedWeek = this.state.selectedWeekDay > 7 ? weekItems[0].weekDay : this.state.selectedWeekDay;
    var foodItemInfo = HomeUtils.getFoodByTypeAndWeek(this.state.totalArray,this.state.orderState,currentSelectedWeek);
    var canOrderFood = HomeUtils.getCanOrderStatus(foodItemInfo,this.state.orderState);
    if (!canOrderFood) return;//如果已经是下单了的，不能加减
    var maxFoodCount;
    var currentFoodNum;
    //西餐
    if (currentSelectedWeek == 1 || currentSelectedWeek == 3 || currentSelectedWeek== 5 || currentSelectedWeek == 7) {
      if (this.state.orderState == 'dinner' ) {
        maxFoodCount = this.state.lunchOrDinnerMaxCount;
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount;
      } else if (this.state.orderState == 'lunch') {
        maxFoodCount = this.state.lunchOrDinnerMaxCount;
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount;
      } else {
        maxFoodCount = this.state.westFoodMaxCount;
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount;
      }

      if (currentFoodNum >= maxFoodCount) {
        console.log('已经超出全部总类限制上限了');
        return;
      }
      if (foodInfo.foodId == '13' || foodInfo.foodId == '20')
      {
          //牛奶等液体，最多点一个
          if (this.state.weekDayFoodCountEntity[currentSelectedWeek].currentWaterCount < this.state.maxWaterCount) {
            var foocount = this.state.weekDayFoodCountEntity[currentSelectedWeek];
            foocount.currentWaterCount += 1;
            foocount.currentFoodCount += 1;
          }else {
            return;
          }
      }
      else {
        if (this.state.orderState == 'breakfast') {
          if (maxFoodCount - this.state.maxWaterCount > this.state.weekDayFoodCountEntity[currentSelectedWeek].currentSolidCount) {
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentSolidCount += 1;
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount += 1;
          }else {
            return;
          }
        }else if(this.state.orderState == 'lunch'){
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount += 1;
        }else {
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount += 1;
        }
      }
    }else { //中餐
      if (this.state.orderState == 'dinner' ) {
        maxFoodCount = this.state.lunchOrDinnerMaxCount;
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount;
      } else if (this.state.orderState == 'lunch') {
        maxFoodCount = this.state.lunchOrDinnerMaxCount;
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount;
      } else {
        maxFoodCount = this.state.chinaFoodMaxCount;
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount;
      }
      if (currentFoodNum >= maxFoodCount) {
        console.log('已经超出全部总类限制上限了');
        return;
      }
      if (foodInfo.foodId == '11')
      {
          //牛奶等液体，最多点一个
          if (this.state.weekDayFoodCountEntity[currentSelectedWeek].currentWaterCount < this.state.maxWaterCount) {
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentWaterCount += 1;
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount += 1;
          }else {
            return;
          }
      }
      else {
        if (this.state.orderState == 'breakfast') {
          if (maxFoodCount - this.state.maxWaterCount > this.state.weekDayFoodCountEntity[currentSelectedWeek].currentSolidCount) {
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentSolidCount += 1;
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount += 1;
          }else {
            return;
          }
        }else if(this.state.orderState == 'lunch'){
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount += 1;
        }else {
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount += 1;
        }
      }
    }
    foodInfo.num += 1;
    var newTotalArray = HomeUtils.updateTotalArray(this.state.totalArray,this.state.orderState,currentSelectedWeek, foodInfo);
    this.setState({totalArray:newTotalArray});
  }
  _onPressReduce(foodInfo){
    var weekItems = HomeUtils.getWeekDaysByType(this.state.totalArray,this.state.orderState);
    var currentSelectedWeek = this.state.selectedWeekDay > 7 ? weekItems[0].weekDay : this.state.selectedWeekDay;
    var foodItemInfo = HomeUtils.getFoodByTypeAndWeek(this.state.totalArray,this.state.orderState,currentSelectedWeek);
    var canOrderFood = HomeUtils.getCanOrderStatus(foodItemInfo,this.state.orderState);
    if (!canOrderFood) return;//如果已经是下单了的，不能加减

    var currentFoodNum;
    //西餐
    if (currentSelectedWeek == 1 || currentSelectedWeek == 3 || currentSelectedWeek== 5 || currentSelectedWeek == 7) {
      if (this.state.orderState == 'dinner' ) {
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount;
      } else if (this.state.orderState == 'lunch') {
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount;
      } else {
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount;
      }
      if (currentFoodNum == 0) {
        console.log('数量已经为0');
        return;
      }
      if (foodInfo.foodId == '13' || foodInfo.foodId == '20')
      {
          //牛奶等液体
          if (foodInfo.num > 0 && this.state.weekDayFoodCountEntity[currentSelectedWeek].currentWaterCount > 0) {
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentWaterCount -= 1;
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount -= 1;
          }else {
            return;
          }
      }
      else {
        if (this.state.orderState == 'breakfast') {
          if (foodInfo.num > 0) {
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentSolidCount -= 1;
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount -= 1;
          }else {
            return;
          }
        }else if(this.state.orderState == 'lunch'){
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount -= 1;
        }else {
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount -= 1;
        }
      }
    }else {
      if (this.state.orderState == 'dinner' ) {
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount;
      } else if (this.state.orderState == 'lunch') {
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount;
      } else {
        currentFoodNum = this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount;
      }
      if (currentFoodNum == 0) {
        console.log('数量已经为0');
        return;
      }
      if (foodInfo.foodId == '11')
      {
          //豆浆等液体，最多点一个
          if (foodInfo.num > 0 && this.state.weekDayFoodCountEntity[currentSelectedWeek].currentWaterCount > 0) {
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentWaterCount -= 1;
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount -= 1;
          }else {
            return;
          }
      }
      else {
        if (this.state.orderState == 'breakfast') {
          if (foodInfo.num > 0) {
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentSolidCount -= 1;
            this.state.weekDayFoodCountEntity[currentSelectedWeek].currentFoodCount -= 1;
          }else {
            return;
          }
        }else if(this.state.orderState == 'lunch'){
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentLunchCount -= 1;
        }else {
          this.state.weekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount -= 1;
        }
      }
    }
    foodInfo.num -= 1;
    var newTotalArray = HomeUtils.updateTotalArray(this.state.totalArray,this.state.orderState,currentSelectedWeek, foodInfo);
    this.setState({totalArray:newTotalArray});
  }
  _onPressOrderBtn(){
    var weekItems = HomeUtils.getWeekDaysByType(this.state.totalArray,this.state.orderState);
    var currentSelectedWeek = this.state.selectedWeekDay > 7 ? weekItems[0].weekDay : this.state.selectedWeekDay;
    var foodItemInfo = HomeUtils.getFoodByTypeAndWeek(this.state.totalArray,this.state.orderState,currentSelectedWeek);
    var canOrderFood = HomeUtils.getCanOrderStatus(foodItemInfo,this.state.orderState);
    var currentFoodType = HomeUtils.getFoodTypeByState(this.state.orderState);//1早餐 2 晚餐 3午餐
    var _this = this;
    if (!canOrderFood) {
      console.log("取消订单");
      var requestUrl = 'https://oatest.camera360.com/orderfood/order/cancelOrder?email='+loginEmail+'&pushToken='
                        +pushToken+'&uId='+loingUserId
                        +'&type='+currentFoodType+'&day='+foodItemInfo.day;
      fetch(requestUrl)
      .then(function(response){
          var __this = _this;
          response.json().then(data => {
            var ___this = __this;
            ___this._handleCancelOrderSuccess(data,currentSelectedWeek);
          });
        });
    }else {
      console.log('开始下单');
      var orderFoods = HomeUtils.getOrderFoodsByFoodItemInfo(foodItemInfo,currentFoodType);
      var requestUrl = 'https://oatest.camera360.com/orderfood/order/create?email='+loginEmail+'&pushToken='
                        +pushToken+'&userId='+loingUserId
                        +'&type='+currentFoodType+'&orderdate='+foodItemInfo.day+'&foods='+JSON.stringify(orderFoods);
      fetch(requestUrl)
      .then(function(response){
        var __this = _this;
        response.json().then(data => {
          var ___this = __this;
          ___this._handleOrderSuccess(data, currentSelectedWeek);
        });
      });
    }
  }
  _handleCancelOrderSuccess(data,currentSelectedWeek){
    if (data.status == 200) {
      var newtotoalArray = HomeUtils.updateCancelOrderType(this.state.totalArray,this.state.orderState,currentSelectedWeek);
      var newWeekDayFoodCountEntity = this.state.weekDayFoodCountEntity;
      if (this.state.orderState == 'breakfast') {
        newWeekDayFoodCountEntity[currentSelectedWeek].currentWaterCount = 0;
        newWeekDayFoodCountEntity[currentSelectedWeek].currentSolidCount = 0;
        newWeekDayFoodCountEntity[currentSelectedWeek].currentFoodCount = 0;
      }else if(this.state.orderState == 'lunch'){
        newWeekDayFoodCountEntity[currentSelectedWeek].currentLunchCount = 0;
      }else {
        newWeekDayFoodCountEntity[currentSelectedWeek].currentDinnerCount = 0;
      }

      this.setState({totalArray:newtotoalArray});
    }
  }

  _handleOrderSuccess(data,currentSelectedWeek){
    if (data.status == 200) {
      var newtotoalArray = HomeUtils.updateOrderType(this.state.totalArray,this.state.orderState,currentSelectedWeek);
      this.setState({totalArray:newtotoalArray});
    }
  }

  ////////makeItemsHandler////////
  _makeWeekDayItems(){
    var weekItems = HomeUtils.getWeekDaysByType(this.state.totalArray,this.state.orderState);
    var currentSelectedWeek = this.state.selectedWeekDay > 7 ? weekItems[0].weekDay : this.state.selectedWeekDay;

    for (var i = 0; i < weekItems.length; i++) {
      var itemData = weekItems[i];
      var weekname = CommonUtils.dateToChina(parseInt(itemData.weekDay));
      var buyName = this.state.orderState + 'BuyStatus';
      var isBuyStatus = itemData[buyName];
        weekItems[i] = (
            <WeekButton title={weekname}
                        onPress={this._onPressWeekDay.bind(this,itemData.weekDay)}
                        isSelected={parseInt(itemData.weekDay) == currentSelectedWeek}
                        isBuyState={!isBuyStatus}
                        key={'weekButton-'+i}
            />
        );
    }
    return weekItems;
  }

  _makeFoodItems(){

    var weekItems = HomeUtils.getWeekDaysByType(this.state.totalArray,this.state.orderState);
    var currentSelectedWeek = this.state.selectedWeekDay > 7 ? weekItems[0].weekDay : this.state.selectedWeekDay;

    var foodItemInfo = HomeUtils.getFoodByTypeAndWeek(this.state.totalArray,this.state.orderState,currentSelectedWeek);
    var viewItems = [];
    for (var i = 0; i < foodItemInfo.foodItems.length; i++) {
      var itemData = foodItemInfo.foodItems[i];
      var foodImageSource = CommonUtils.getFoodNameByName(itemData.foodName);
      var foodPluseImageSource = HomeUtils.getPluseImageByStatus(foodItemInfo,this.state.orderState);
      var foodReduceImageSource = HomeUtils.getReduceImageByStatus(foodItemInfo,this.state.orderState);
        viewItems[i] = (
          <OrderView viewImage={foodImageSource}
                     viewStyle = {styles.orderItem}
                     selectedState={itemData.num >0 ? true : false}
                     plusePress={this._onPressPlus.bind(this,itemData)}
                     pluseImage={foodPluseImageSource}
                     reduePress={this._onPressReduce.bind(this,itemData)}
                     reduceImage={foodReduceImageSource}
                     title={itemData.foodName}
                     countNum={itemData.num}
                     key={'foodname-key-'+i}/>
        );
    }
    return viewItems;
  }

  _makeOrderBtn(){
    var weekItems = HomeUtils.getWeekDaysByType(this.state.totalArray,this.state.orderState);
    var currentSelectedWeek = this.state.selectedWeekDay > 7 ? weekItems[0].weekDay : this.state.selectedWeekDay;

    var foodItemInfo = HomeUtils.getFoodByTypeAndWeek(this.state.totalArray,this.state.orderState,currentSelectedWeek);

    var canOrderFood = HomeUtils.getCanOrderStatus(foodItemInfo,this.state.orderState);
    var btnTitle = canOrderFood? '提交'+CommonUtils.dateToChina(parseInt(currentSelectedWeek))+'订餐' : '取消'+CommonUtils.dateToChina(parseInt(currentSelectedWeek))+'订餐'
    var item = (<OrderButton onPress={this._onPressOrderBtn.bind(this)} title={btnTitle}  key= {0}/>);
    return item;
  }

  render() {
    if (this.state.totalArray.length == 0)
    {
        return (<ActivityIndicator
                  animating={this.state.animating}
                  style={[styles.centering, {height: 80}]}
                  size="large"
                />);
    }
    var verticalScrollView = (
      <View style={deviceOS == 'ios' ? styles.mainContainerForIOS : styles.mainContainerForAndroid}>
        <View style={deviceOS == 'ios' ? styles.topBarContainerForIos : styles.topBarContainerForAndroid}>
            <Button onPress={this._onPressBreakfast.bind(this)} isSelected={'breakfast'===this.state.orderState} title="早餐点餐" key= {0} />
            <Button onPress={this._onPressMidDinner.bind(this)} isSelected={'lunch'===this.state.orderState} title="午餐点餐"  key= {1}/>
            <Button onPress={this._onPressDinner.bind(this)} isSelected={'dinner'===this.state.orderState} title="晚餐点餐"  key= {2}/>
            <Button onPress={this._onPressMyOrder.bind(this)} isSelected={'myOrder'===this.state.orderState} title="我的订单"  key= {4}/>
        </View>
        <View style={styles.orderContainer}>
            <ScrollView key={'weekdayScrollView'} style={styles.weekContainer} automaticallyAdjustContentInsets={false}>
                {this._makeWeekDayItems()}
            </ScrollView>
            <ScrollView key={'verticalScrollView'} style={styles.foodListContainer} automaticallyAdjustContentInsets={false}>
                {this._makeFoodItems()}
            </ScrollView>
        </View>
        <View style={styles.orderBtnContainer}>
            {this._makeOrderBtn()}
        </View>
      </View>

    );

    return verticalScrollView;

  }
}

const styles = StyleSheet.create({

  mainContainerForIOS: {
    backgroundColor: '#eaeaea',
    flex:1,
    marginTop:15
  },
  mainContainerForAndroid: {
    backgroundColor: '#eaeaea',
    flex:1,
    marginTop:0
  },
  topBarContainerForIos:{
    height:50,
    marginTop:15,
    flexDirection:'row',
    flex:2,
  },
  topBarContainerForAndroid:{
    height:50,
    marginTop:0,
    flexDirection:'row',
    flex:2,
  },
  button: {
    height: 50,
    flex:1,
    borderWidth:0.5,
    borderColor:'#dfe0e1',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdbdbd'
  },
  buttonText:{
    fontSize:13,
    color:'white'
  },
  buttonSelected:{
    height: 50,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#da5046'
  },
  // //////////////////////以下是星期和选择食物的样式
  orderContainer:{
    flexDirection:'row',
    flex:996
  },
  //////星期样式
  weekContainer:{
    flex:2,
    backgroundColor:'white',
    borderRightWidth:1,
    borderColor:'#dfe0e1'
  },
  weekDay:{
    margin:5,
    width:40,
    height:40,
    borderRadius:20,
    borderWidth:1,
    borderColor:'#da5046',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  weekDaySelected:{
    margin:5,
    width:40,
    height:40,
    borderRadius:20,
    borderWidth:1,
    borderColor:'#da5046',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#da5046'
  },
  weekDayBuyed:{
    margin:5,
    width:40,
    height:40,
    borderRadius:20,
    borderWidth:1,
    borderColor:'#8fbca1',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#8fbca1'
  },
  weekDayText:{
    fontSize:12,
    color:'#da5046'
  },
  weekDayTextSelected:{
    fontSize:12,
    color:'white'
  },
  //////食物选择样式
  foodListContainer: {
    flex:9,
    // paddingLeft:5,
    backgroundColor:'white'
  },
  orderItem: {
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 5
  },
  foodStyle:{
    width:50,
    height:50
  },
  unseletedStyle:{
    width:0,
    height:0,
    position:'absolute',
    left:0,
    top:0
  },
  seletedStyle:{
    width:50,
    height:50,
    position:'absolute',
    left:0,
    top:0
  },
  actionImage:{
    marginLeft:6,
    marginRight:6
  },
  orderCountText:{
    fontSize:13,
    marginLeft:6,
    marginRight:6
  },
  orderFoodNameText:{
    fontSize:13,
    marginLeft:6
  },
  //////////////订单按钮样式
  orderBtnContainer:{
    flex:2,
    height:50
  },
  orderBtnStyle:{
    height: 50,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#55bf79'
  },
  orderBtnText:{
    fontSize:14,
    color:'white'
  }
});

export default Home;
