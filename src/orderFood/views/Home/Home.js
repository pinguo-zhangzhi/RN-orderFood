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
  <TouchableHighlight
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
      <Text>{title}</Text>
  </TouchableHighlight>
)

const WeekButton = ({title, onPress}) => (
  <TouchableHighlight
    underlayColor='#a52a2a'
    onPress={onPress}
    style={styles.weekDay}>
      <Text >{title}</Text>
  </TouchableHighlight>
)

var BREAKFAST = 6;
var DINNER = 1;

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      orderState:'breakfast'
    }
  }

  makeItems = (nItems: number, styles): Array<any> => {
    var items = [];
    for (var i = 0; i < nItems; i++) {
       items[i] = (
         <TouchableOpacity key={i} style={styles}>
           <Text>{'Item ' + i}</Text>
         </TouchableOpacity>
        // <View key={i} style = {styles}>
        //   <Text style={styles.weekStyle}>周一</Text>
        //   <ScrollView style={styles.horizontalStyle} horizontal={true} showsHorizontalScrollIndicator={false}>
        //     {this.makeInnerItems(7, [styles.itemWrapper, styles.horizontalItemWrapper])}
        //   </ScrollView>
        // </View>

       );
    }
    return items;
  }

  makeInnerItems = (nItems:number, styles): Array<any> => {
    var items = [];
    for (var i = 0; i < nItems; i++) {
       items[i] = (
         <TouchableOpacity key={i} style={styles}>
           <Text>{'Item ' + i}</Text>
         </TouchableOpacity>
       );
    }
    return items;
  }

  _onPressDinner(){
    this.setState({orderState:'dinner'});
  }
  _onPressMidDinner(){
    this.setState({orderState:'dinner'});
  }
  _onPressBreakfast(){
    this.setState({orderState:'breakfast'});
  }
  render() {
    var items;
    if (this.state.orderState == 'breakfast')
    {
        items = this.makeItems(BREAKFAST, styles.orderItem);
    }
    else
    {
        items = this.makeItems(DINNER, styles.orderItem);
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
              <WeekButton onPress={this._onPressBreakfast.bind(this)} title='周一'/>
              <WeekButton onPress={this._onPressMidDinner.bind(this)} title='周二'/>
              <WeekButton onPress={this._onPressDinner.bind(this)} title='周三'/>
              <WeekButton onPress={this._onPressDinner.bind(this)} title='周四'/>
              <WeekButton onPress={this._onPressDinner.bind(this)} title='周五'/>
              <WeekButton onPress={this._onPressDinner.bind(this)}  title='周六'/>
              <WeekButton onPress={this._onPressDinner.bind(this)} title='周日'/>
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
    backgroundColor: 'white'
  },
  stateContainer:{
    height:50,
    margin:2,
    flexDirection:'row'
  },
  button: {
    height: 50,
    flex:3,
    margin:5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDEDED'
  },
  verticalScrollView: {
    marginTop: 10,
    marginLeft:5,
    marginRight:5,
    flex:1
  },
  orderItem: {
    height:100,
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor: '#dddddd',
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#a52a2a',
    padding: 30,
    margin: 5,
  },
  orderContainer:{
    flexDirection:'row',
    marginTop:10
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
    borderColor:'#a52a2a',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  weekDaySelected:{
    backgroundColor:'#a52a2a'
  }

})
