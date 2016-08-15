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
  NavigationExperimental
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'
import orderData from './homeMock'
import * as CommonUtils from '../commonUtils'
import * as HomeUtils from './HomeUtils'

const Button = ({title, onPress, isSelected}) => (
  <TouchableOpacity
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={isSelected?styles.buttonSelected:styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
)

const WeekButton = ({title, onPress, isSelected}) => (
  <TouchableOpacity
    onPress={onPress}
    style={isSelected?styles.weekDaySelected:styles.weekDay}>
      <Text style={styles.weekDayText}>{title}</Text>
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
      <TouchableOpacity  onPress={plusePress}>
           <Image style={styles.actionImage} source={reduceImage}  />
      </TouchableOpacity>
      <Text style = {styles.orderCountText}>{countNum}</Text>
      <TouchableOpacity  onPress={reduePress}>
           <Image style={styles.actionImage} source={pluseImage} />
      </TouchableOpacity>
      <Text style = {styles.orderFoodNameText}>{title}</Text>
  </View>
)

class Home extends Component {

  constructor(props) {
    super(props)
    var totalArray = HomeUtils.processOrderData(orderData);
    this.state = {
      totalArray:totalArray,
      orderState:'breakfast',
      selectedWeekDay:999
    }
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
  _onPressPlus(foodId){

  }
  _onPressReduce(foodId){

  }
  _onPressOrderBtn(){

  }

  ////////makeItemsHandler////////
  _makeWeekDayItems(){
    var weekItems = HomeUtils.getWeekDaysByType(this.state.totalArray,this.state.orderState);
    var currentSelectedWeek = this.state.selectedWeekDay > 7 ? weekItems[0].weekDay : this.state.selectedWeekDay;

    for (var i = 0; i < weekItems.length; i++) {
      var itemData = weekItems[i];
      var weekname = CommonUtils.dateToChina(parseInt(itemData.weekDay));
        weekItems[i] = (
            <WeekButton onPress={this._onPressWeekDay.bind(this,itemData.weekDay)} isSelected={parseInt(itemData.weekDay) == currentSelectedWeek} key={'weekButton-'+i} title={weekname}/>
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
                     plusePress={this._onPressPlus.bind(this,itemData.foodId)}
                     pluseImage={foodPluseImageSource}
                     reduePress={this._onPressReduce.bind(this,itemData.foodId)}
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

    var verticalScrollView = (
      <View style={styles.mainContainer}>
        <View style={styles.topBarContainer}>
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

  mainContainer: {
    backgroundColor: '#eaeaea',
    flex:1
  },
  topBarContainer:{
    height:50,
    marginTop:15,
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
  weekDayText:{
    fontSize:12,
    color:'black'
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
