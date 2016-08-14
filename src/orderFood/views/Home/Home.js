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

const OrderView = ({viewImage, viewStyle, pulsePress,reduePress, title, countNum}) =>(
  <View style = {viewStyle}>
      <Image style={styles.foodStyle}  source={viewImage} />
      <TouchableOpacity  onPress={reduePress}>
           <Image style={styles.actionImage} source={require('../../assets/reduce_normal.png')} />
      </TouchableOpacity>
      <Text>{countNum}</Text>
      <TouchableOpacity  onPress={pulsePress}>
           <Image style={styles.actionImage} source={require('../../assets/plus_normal.png')}  />
      </TouchableOpacity>
      <Text>{title}</Text>
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

    var foodItems = HomeUtils.getFoodByTypeAndWeek(this.state.totalArray,this.state.orderState,currentSelectedWeek);
    var viewItems = [];
    for (var i = 0; i < foodItems.length; i++) {
      var itemData = foodItems[i];
      var foodImageSource = CommonUtils.getFoodNameByName(itemData.foodName);
        viewItems[i] = (
          <OrderView viewImage={foodImageSource}
                     viewStyle = {styles.orderItem}
                     pulsePress={this._onPressPlus.bind(this,itemData.foodId)}
                     reduePress={this._onPressReduce.bind(this,itemData.foodId)}
                     title={itemData.foodName}
                     countNum={0}
                     key={'foodname-key-'+i}/>
        );
    }
    return viewItems;
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
    flex:998
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
  }
});

export default Home;
