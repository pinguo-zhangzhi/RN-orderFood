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

const Button = ({title, onPress}) => (
  <TouchableOpacity
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
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

const OrderView = ({viewImage, viewStyle, pulsePress,reduePress, title}) =>(
  <View style = {viewStyle}>
      <Image style={styles.foodStyle}  source={viewImage} />
      <TouchableOpacity  onPress={reduePress}>
           <Image style={styles.actionImage} source={require('../../assets/reduce_normal.png')} />
      </TouchableOpacity>
      <Text>0</Text>
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
      weekDayState:1
    }
  }

  makeChinaBFItems = (nItems: number, itemStyle): Array<any> => {
    var items = [];
    items[0] = <OrderView viewImage={require('../../assets/mt.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='馒头'
                          key={0}/>;
    items[1] = <OrderView viewImage={require('../../assets/bz.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='包子'
                          key={1}/>;
    items[2] = <OrderView viewImage={require('../../assets/hj.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='花卷'
                          key={2}/>;
    items[3] = <OrderView viewImage={require('../../assets/jd.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='鸡蛋'
                          key={3}/>;
    items[4] = <OrderView viewImage={require('../../assets/dj.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='豆浆'
                          key={4}/>;
    return items;
  }

  makeWestBFItems = (nItems: number, itemStyle): Array<any> => {
    var items = [];
    items[0] = <OrderView viewImage={require('../../assets/nn.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='牛奶'
                          key={0}/>;
    items[1] = <OrderView viewImage={require('../../assets/yanmai.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='牛奶（加燕麦）'
                          key={1}/>;
    items[2] = <OrderView viewImage={require('../../assets/blas.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='布里奥斯'
                          key={2}/>;
    items[3] = <OrderView viewImage={require('../../assets/mym.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='蔓越莓面包'
                          key={3}/>;
    items[4] = <OrderView viewImage={require('../../assets/rs.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='肉松'
                          key={4}/>;
    items[5] = <OrderView viewImage={require('../../assets/rsf.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='瑞士风'
                          key={5}/>;
    items[6] = <OrderView viewImage={require('../../assets/smz.png')}
                          viewStyle = {itemStyle}
                          pulsePress={this._onPressPlus.bind(this)}
                          reduePress={this._onPressReduce.bind(this)}
                          title='三明治'
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
                          key={0}/>;
    return items;
  }

  _onPressPlus(){
    console.log('press plus');
  }
  _onPressReduce(){
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
          items = this.makeChinaBFItems(BREAKFAST, styles.orderItem);
        }
        else {
          items = this.makeWestBFItems(BREAKFAST, styles.orderItem);
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
            <Button onPress={this._onPressBreakfast.bind(this)} title="早餐点餐" key= {0} />
            <Button onPress={this._onPressMidDinner.bind(this)} title="午餐点餐"  key= {1}/>
            <Button onPress={this._onPressDinner.bind(this)} title="晚餐点餐"  key= {2}/>
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
          <ScrollView style={styles.verticalScrollView}>
            {items}
          </ScrollView>
        </View>

      </View>

    );

    return verticalScrollView;

  }
}

export default Home;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#eaeaea'
  },
  stateContainer:{
    height:50,
    margin:2,
    marginTop:10,
    flexDirection:'row'
  },
  button: {
    height: 50,
    flex:3,
    margin:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdbdbd'
  },
  verticalScrollView: {
    marginTop:15
  },
  orderItem: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 5,
    height:65
  },
  orderContainer:{
    flexDirection:'row',
    marginTop:10,
  },
  weekContainer:{
    width:65,
    marginTop:10
  },
  weekDay:{
    margin:5,
    width:50,
    height:50,
    borderRadius:25,
    borderWidth:1,
    borderColor:'#da5046',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  weekDaySelected:{
    margin:5,
    width:50,
    height:50,
    borderRadius:25,
    borderWidth:1,
    borderColor:'#da5046',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#da5046'
  },
  foodStyle:{
    width:60,
    height:60,
  },
  actionImage:{
    marginLeft:10,
    marginRight:10
  }

})
