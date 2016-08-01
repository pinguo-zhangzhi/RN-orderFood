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

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list,OFNavigationType_orderBreakfast} from '../../components/appRouter/RouterAction'

const Button = ({title, onPress}) => (
  <TouchableHighlight
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
      <Text>{title}</Text>
  </TouchableHighlight>
)

var NUM_ITEMS = 3;

class Home extends Component {

  makeItems = (nItems: number, styles): Array<any> => {
    var items = [];
    items[0] = (
      <Button onPress={this._onPressBreakfast.bind(this)} title="预定早餐" key= {0}/>
    );
    items[1] = (
      <Button onPress={this._onPress.bind(this)} title="预定午餐"  key= {1}/>
    );
    items[2] = (
      <Button onPress={this._onPress.bind(this)} title="预定晚餐"  key= {2}/>
    );
    items[3] = (
      <Button onPress={this._onPress.bind(this)} title="我的订单"  key= {3}/>
    );
    return items;
  };
  _onPress(){
    this.props.popView(true);
  }
  _onPressBreakfast(){
    this.props.pushView(OFNavigationType_orderBreakfast, true);
  }
  render() {
    // One of the items is a horizontal scroll view
    var items = this.makeItems(NUM_ITEMS, styles.itemWrapper);
    // items[4] = (
    //   <ScrollView key={'scrollView'} horizontal={true}>
    //     {this.makeItems(NUM_ITEMS, [styles.itemWrapper, styles.horizontalItemWrapper])}
    //   </ScrollView>
    // );

    var verticalScrollView = (
      <View style={styles.container}>
        <Image resizeMode={Image.resizeMode.cover} style={styles.logo} source={require('./logo.png')}></Image>
        <Text style={styles.welcomeText}>马剑光，欢迎使用订餐系统</Text>
        <ScrollView style={styles.verticalScrollView}>
          {items}
        </ScrollView>
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
  logo:{
    margin:0
  },
  welcomeText:{
    fontSize:20,
    color:'black',
    textAlign:'center'
  },
  button: {
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#EDEDED'
  },

  verticalScrollView: {
      margin: 10,
  },
  itemWrapper: {
      backgroundColor: '#dddddd',
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 5,
      borderColor: '#a52a2a',
      padding: 30,
      margin: 5,
  },
  horizontalItemWrapper: {
      padding: 50
    }
})
