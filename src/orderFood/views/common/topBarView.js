'use strict';

import React, { Component } from 'react'
import ReactNative from 'react-native'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  RecyclerViewBackedScrollView,
  ListView,
  AlertIOS,
  ScrollView,
  NavigationExperimental
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'

var TopBarView = React.createClass({

  render: function() {
    return (
        <View style={styles.containerView}>
            <TouchableOpacity  onPress={this.props.clickBackView}>
                 <Image style={styles.backIcon} source={require('../../assets/back.png')}/>
            </TouchableOpacity>
            <Text style={styles.titleName}>订单列表</Text>
        </View>
    );
  },

});
export default TopBarView;

const styles = StyleSheet.create({
  containerView: {
    height:60,
    flexDirection:'row',
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
  },
  backIcon:{
    width:24,
    height:24,
    marginLeft:16,
    marginTop:16,
  },
  titleName:{
    fontSize:15,
    flex:7,
    paddingRight:40,
    paddingTop:15,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
  }
})
