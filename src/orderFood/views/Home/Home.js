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
      <Text >{title}</Text>
  </TouchableOpacity>
)

const WeekButton = ({title, onPress, isSelected}) => (
  <TouchableOpacity
    onPress={onPress}
    style={isSelected?styles.weekDaySelected:styles.weekDay}>
      <Text >{title}</Text>
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
      orderState:'breakfast'
    }
  }
  ////////pressHandler////////
  _onPress(){
    this.props.popView(true);
 }
  _onPressDinner(){
    this._onPress();
    return;
    this.setState({orderState:'dinner'});
  }
  _onPressMidDinner(){
    this.setState({orderState:'midDinner'});
  }
  _onPressBreakfast(){
    this.setState({orderState:'breakfast'});
  }
  _onPressMyOrder(){
    this.props.pushView(OFNavigationType_list,true);
  }
  _onPressWeekDay(pressDay){
    this.setState({weekDayState:pressDay});
  }

  ////////makeItemsHandler////////
  _makeWeekDayItems(){
    var weekItems = [];

    for (var i = 0; i < nItems.length; i++) {
      var foodImageSource = Untils.getFoodNameByName(nItems[i].foodName);//不知道为什么，使用中文名字的图片，无法加载出来？

        weekItems[i] = (
          <View style={styles.orderFoodContainer} key={i+nItems[i].foodName}>
            <Image style={styles.foodImage} source={foodImageSource} />
            <Text style={styles.foodName}>{nItems[i].foodNum > 1 ? nItems[i].foodName+"*"+nItems[i].foodNum : nItems[i].foodName}</Text>
          </View>
          // <WeekButton onPress={this._onPressWeekDay.bind(this,1)} isSelected={1===this.state.weekDayState} title='周一'/>
        );
    }
    return weekItems;
  }

  render() {

    var verticalScrollView = (
      <View style={styles.mainContainer}>
        <View style={styles.topBarContainer}>
            <Button onPress={this._onPressBreakfast.bind(this)} isSelected={'breakfast'===this.state.orderState} title="早餐点餐" key= {0} />
            <Button onPress={this._onPressMidDinner.bind(this)} isSelected={'midDinner'===this.state.orderState} title="午餐点餐"  key= {1}/>
            <Button onPress={this._onPressDinner.bind(this)} isSelected={'dinner'===this.state.orderState} title="晚餐点餐"  key= {2}/>
            <Button onPress={this._onPressMyOrder.bind(this)} isSelected={'myOrder'===this.state.orderState} title="我的订单"  key= {4}/>
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
    flex:2
  },
  button: {
    height: 50,
    flex:1,
    borderWidth:0.5,
    borderColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdbdbd'
  },
  buttonSelected:{
    height: 50,
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#da5046'
  },
  orderContainer:{
    flexDirection:'row',
    marginTop:3,
    flex:998
  },
  verticalScrollView: {
    marginTop:5,
    paddingLeft:5
  },
  orderItem: {
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 5
  },
  weekContainer:{
    width:45,
    marginTop:10
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
  }

});

export default Home;
