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

var BREAKFAST = 6;
var DINNER = 1;

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      orderState:'breakfast',
      weekDayState:1,
      waterName:'',
      waterNum:0,
      foodName:'',
      foodNum:0,
    }
  }

  makeChinaBFItems = (nItems, itemStyle): Array<any> => {
    var items = [];
    items[0] = <OrderView viewImage={require('../../assets/mt.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'馒头')}
                          reduePress={this._onPressReduce.bind(this,'馒头')}
                          title='馒头'
                          countNum={this.state.foodName === '馒头'?this.state.foodNum:0}
                          key={0}/>;
    items[1] = <OrderView viewImage={require('../../assets/bz.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'包子')}
                          reduePress={this._onPressReduce.bind(this,'包子')}
                          title='包子'
                          countNum={this.state.foodName === '包子'?this.state.foodNum:0}
                          key={1}/>;
    items[2] = <OrderView viewImage={require('../../assets/hj.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'花卷')}
                          reduePress={this._onPressReduce.bind(this,'花卷')}
                          title='花卷'
                          countNum={this.state.foodName === '花卷'?this.state.foodNum:0}
                          key={2}/>;
    items[3] = <OrderView viewImage={require('../../assets/jd.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'鸡蛋')}
                          reduePress={this._onPressReduce.bind(this,'鸡蛋')}
                          title='鸡蛋'
                          countNum={this.state.foodName === '鸡蛋'?this.state.foodNum:0}
                          key={3}/>;
    items[4] = <OrderView viewImage={require('../../assets/dj.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'豆浆')}
                          reduePress={this._onPressReduce.bind(this,'豆浆')}
                          title='豆浆'
                          countNum={this.state.waterName === '豆浆'?this.state.waterNum:0}
                          key={4}/>;
    return items;
  }

  makeWestBFItems = (nItems, itemStyle): Array<any> => {
    var items = [];
    items[0] = <OrderView viewImage={require('../../assets/nn.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'牛奶')}
                          reduePress={this._onPressReduce.bind(this,'牛奶')}
                          title='牛奶'
                          countNum={this.state.waterName === '牛奶'?this.state.waterNum:0}
                          key={0}/>;
    items[1] = <OrderView viewImage={require('../../assets/yanmai.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'牛奶（加燕麦）')}
                          reduePress={this._onPressReduce.bind(this,'牛奶（加燕麦）')}
                          title='牛奶（加燕麦）'
                          countNum={this.state.waterName === '牛奶（加燕麦）'?this.state.waterNum:0}
                          key={1}/>;
    items[2] = <OrderView viewImage={require('../../assets/blas.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'布里奥斯')}
                          reduePress={this._onPressReduce.bind(this,'布里奥斯')}
                          title='布里奥斯'
                          countNum={this.state.foodName === '布里奥斯'?this.state.foodNum:0}
                          key={2}/>;
    items[3] = <OrderView viewImage={require('../../assets/mym.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'蔓越莓面包')}
                          reduePress={this._onPressReduce.bind(this,'蔓越莓面包')}
                          title='蔓越莓面包'
                          countNum={this.state.foodName === '蔓越莓面包'?this.state.foodNum:0}
                          key={3}/>;
    items[4] = <OrderView viewImage={require('../../assets/rs.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'肉松')}
                          reduePress={this._onPressReduce.bind(this,'肉松')}
                          title='肉松'
                          countNum={this.state.foodName === '肉松'?this.state.foodNum:0}
                          key={4}/>;
    items[5] = <OrderView viewImage={require('../../assets/rsf.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'瑞士风')}
                          reduePress={this._onPressReduce.bind(this,'瑞士风')}
                          title='瑞士风'
                          countNum={this.state.foodName === '瑞士风'?this.state.foodNum:0}
                          key={5}/>;
    items[6] = <OrderView viewImage={require('../../assets/smz.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this,'三明治')}
                          reduePress={this._onPressReduce.bind(this,'三明治')}
                          title='三明治'
                          countNum={this.state.foodName === '三明治'?this.state.foodNum:0}
                          key={6}/>;
    return items;
  }
  makeDinnerItems = (title, itemStyle): Array<any> => {
    var items = [];
    items[0] = <OrderView viewImage={require('../../assets/wc.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title={title}
                          countNum={0}
                          key={0}/>;
    return items;
  }

  _onPressPlus(orderFoodName){
    if (this.state.orderState == 'breakfast') {
      if (this.state.weekDayState%2 == 0)
      {
        if (orderFoodName == '豆浆') {
          this.state.waterNum > 0 ? '' : this.setState({waterName:orderFoodName,waterNum:this.state.waterNum + 1}) ;
        }else {
          this.state.foodNum > 0? '' : this.setState({foodName:orderFoodName,foodNum:this.state.foodNum + 1}) ;
        }
      }
      else {
        if (orderFoodName == '牛奶' || orderFoodName == '牛奶（加燕麦）') {
          this.state.waterNum > 0 ? '' : this.setState({waterName:orderFoodName,waterNum:this.state.waterNum + 1}) ;
        }else {
          this.state.foodNum > 0? '' : this.setState({foodName:orderFoodName,foodNum:this.state.foodNum + 1}) ;
        }

      }
    }
    console.log('press plus');
  }
  _onPressReduce(orderFoodName){
    if (this.state.orderState == 'breakfast') {
      if (this.state.weekDayState%2 == 0)
      {
        if (orderFoodName == '豆浆') {
          this.state.waterNum === 0 ? '' : this.setState({waterName:orderFoodName,waterNum:this.state.waterNum - 1}) ;
        }else {
          this.state.foodNum === 0? '' : this.setState({foodName:orderFoodName,foodNum:this.state.foodNum - 1}) ;
        }
      }
      else {
        if (orderFoodName == '牛奶' || orderFoodName == '牛奶（加燕麦）') {
          this.state.waterNum === 1 && this.state.waterName === orderFoodName ? this.setState({waterName:'',waterNum:this.state.waterNum - 1})  : '';
        }else {
          this.state.foodNum === 1 && this.state.foodName === orderFoodName? this.setState({foodName:'',foodNum:this.state.foodNum - 1})  : '';
        }

      }
    }
    console.log('press plus');
  }
  _onPressDinner(){
    this.setState({orderState:'dinner'});
  }
  _onPressMidDinner(){
    this.setState({orderState:'midDinner'});
  }
  _onPressBreakfast(){
    this.setState({orderState:'breakfast'});
  }
  _onPressWeekDay(pressDay){
    this.setState({weekDayState:pressDay});
  }
  render() {
    var items;
    if (this.state.orderState == 'breakfast')
    {
        if (this.state.weekDayState%2 == 0)
        {
          items = this.makeChinaBFItems('早餐', styles.orderItem);
        }
        else {
          items = this.makeWestBFItems('早餐', styles.orderItem);
        }
    }
    else
    {
        if (this.state.orderState == 'midDinner') {
          items = this.makeDinnerItems('午餐', styles.orderItem);
        }else {
          items = this.makeDinnerItems('晚餐', styles.orderItem);
        }

    }
    var verticalScrollView = (
      <View style={styles.container}>
        <View style={styles.stateContainer}>
            <Button onPress={this._onPressBreakfast.bind(this)} isSelected={'breakfast'===this.state.orderState} title="早餐点餐" key= {0} />
            <Button onPress={this._onPressMidDinner.bind(this)} isSelected={'midDinner'===this.state.orderState} title="午餐点餐"  key= {1}/>
            <Button onPress={this._onPressDinner.bind(this)} isSelected={'dinner'===this.state.orderState} title="晚餐点餐"  key= {2}/>
        </View>
        <View style={styles.orderContainer}>
          <View style={styles.weekContainer}>
              <WeekButton onPress={this._onPressWeekDay.bind(this,1)} isSelected={1===this.state.weekDayState} title='周一'/>
              <WeekButton onPress={this._onPressWeekDay.bind(this,2)} isSelected={2===this.state.weekDayState} title='周二'/>
              <WeekButton onPress={this._onPressWeekDay.bind(this,3)} isSelected={3===this.state.weekDayState} title='周三'/>
              <WeekButton onPress={this._onPressWeekDay.bind(this,4)} isSelected={4===this.state.weekDayState} title='周四'/>
              <WeekButton onPress={this._onPressWeekDay.bind(this,5)} isSelected={5===this.state.weekDayState} title='周五'/>
              <WeekButton onPress={this._onPressWeekDay.bind(this,6)} isSelected={6===this.state.weekDayState} title='周六'/>
              <WeekButton onPress={this._onPressWeekDay.bind(this,7)} isSelected={7===this.state.weekDayState} title='周日'/>
          </View>
          <ScrollView style={styles.verticalScrollView} automaticallyAdjustContentInsets={false}>
            {items}
          </ScrollView>
        </View>

      </View>

    );

    return verticalScrollView;

  }
}

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#eaeaea',
    flex:1
  },
  stateContainer:{
    height:50,
    marginTop:10,
    flexDirection:'row',
    flex:2
  },
  button: {
    height: 50,
    flex:1,
    marginLeft:3,
    marginRight:3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdbdbd'
  },
  buttonSelected:{
    height: 50,
    flex:1,
    marginLeft:3,
    marginRight:3,
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
  },
  foodStyle:{
    width:55,
    height:55,
  },
  actionImage:{
    marginLeft:10,
    marginRight:10
  }

});

export default Home;
