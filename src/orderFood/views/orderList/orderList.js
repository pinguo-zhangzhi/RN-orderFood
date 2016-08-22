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
  AsyncStorage,
  NavigationExperimental
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'
import * as Untils from '../commonUtils'
import foodPhotosIndex from '../foodPhoto'
import TopBar from '../common/topBarView'

var Storage_UserId_Key = 'Storage_UserId_Key';
var Storage_UserEmail_Key = 'Storage_UserEmail_Key';
var Storage_PushToken_Key = 'Storage_PushToken_Key';

var loginEmail,pushToken,userId;
var listData;

var OrderListView = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
    AsyncStorage.multiGet([Storage_UserEmail_Key,Storage_PushToken_Key,Storage_UserId_Key])
          .then((value) => {
            if (value !== null){
              loginEmail = value[0][1];
              pushToken = value[1][1];
              userId = value[2][1];
              this._rquestData();
            } else {
              console.log('AsyncStorage fail' )
            }
          })
          .catch((error) => console.log('AsyncStorage error: ' + error.message))
          .done();
  },

  _rquestData:function(){
    var _this = this;
    var currentDay = '';
    fetch('https://oatest.camera360.com/orderfood/order/getOrderStatisticsByuId?uid='+userId +'&pushToken='+pushToken+'&email='+loginEmail+'&day=20160821')
    .then(function(response){
      var __this = _this;
      response.json().then(data => {
        var ___this = __this;
        ___this._handlerRequestDataSuccess(data);
        // requestTotalArray = HomeUtils.processOrderData(data);
        // ___this.setState({totalArray:requestTotalArray});
      });
    });
  },
  _handlerRequestDataSuccess:function(data){
    if (data.status != 200 || data.data.length == 0) {
      return;
    }
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    listData = data;
    this.setState({
      dataSource: ds.cloneWithRows(this._genRows({})),
    });
  },

  _backClickHandler:function(){
    this.props.popView(true);
  },

  render: function() {
    if (listData && listData !== null) {
      return (
          <View style={styles.mainContainer}>
              <TopBar style={styles.topBarStyle} clickBackView={this._backClickHandler} />
              <ListView style={styles.listView}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                renderSeparator={this._renderSeparator}
              />
          </View>
      );
    }
    else {
      return (
        <View style={styles.mainContainer}>
            <TopBar style={styles.topBarStyle} clickBackView={this._backClickHandler} />
            <View style={styles.noDataStyle}><Text>没有订单哦</Text></View>
        </View>
        );
    }

  },
  // rowData
  // "email": "mang@camera360.com","nickname": "马",  "groupName": "想拍就拍",  "groupId": "25","foodName": "晚餐",
  // "foodId": "14","type": "2",  "createTime": "1470471183",  "DAY": "20160809","foodNum": "1"
  _renderRow: function(rowData: Object, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
          <View style={styles.row}>
            <View style={styles.timeView}>
                <Text style={styles.dayText}>
                  {Untils.getDay(rowData.DAY)}/
                </Text>
                <View style={styles.weekMonth}>
                  <Text style={styles.weekDayText}>
                    {Untils.getWeekDay(rowData.DAY)}
                  </Text>
                  <Text style={styles.monthText}>
                    {Untils.getMonth(rowData.DAY)}
                  </Text>
                </View>
            </View>
            <View style={styles.foodView}>
                <ScrollView key={'scrollView'} horizontal={true}>
                    {this._makeOrderItems(rowData.list)}
                </ScrollView>
            </View>

        </View>
    );
  },

  _makeOrderItems: function(nItems:Array,itemStyle): Array<any> {
    var items = [];

    for (var i = 0; i < nItems.length; i++) {
      var foodImageSource = Untils.getFoodNameByName(nItems[i].foodName);//不知道为什么，使用中文名字的图片，无法加载出来？

        items[i] = (
          <View style={styles.orderFoodContainer} key={i+nItems[i].foodName}>
            <Image style={styles.foodImage} source={foodImageSource} />
            <Text style={styles.foodName}>{nItems[i].foodNum > 1 ? nItems[i].foodName+"*"+nItems[i].foodNum : nItems[i].foodName}</Text>
          </View>

        );
    }
    return items;
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    if (listData && listData !== null) {
      dataBlob = Untils.getFoodList(listData);//listData.data;
    }
    return dataBlob;
  },

  _renderSeparator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
});
export default OrderListView;

const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  topBarStyle:{
    flex:2,
  },
  noDataStyle:{
    flex:8,
    marginTop:2,
    backgroundColor:'#f6f6f6',
    justifyContent: 'center',
    alignItems:'center',
  },
  listView: {
    flex:8,
    marginTop:2,
    backgroundColor:'#f6f6f6'
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height:120
  },
  timeView:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    flex:2.5,
    borderRightWidth:1,
    borderRightColor:'black'
  },
  foodView:{
    flexDirection: 'row',
    flex:7.5,
    alignItems:'center',
    justifyContent: 'center',
    // backgroundColor:'blue'
  },
  dayText:{
    fontSize:30,
    color:'#dd4f45'
  },
  weekDayText:{
    fontSize:13,
    color:'black'
  },
  monthText:{
    fontSize:13,
    color:'black'
  },
  text: {
    flex: 1,
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
  },
  orderFoodContainer:{
    alignItems:'center',
    justifyContent: 'center',
    margin:5
  },
  foodImage:{
    width:80,
    height:80
  },
  foodName:{
    fontSize:15,
    marginTop:5
  }
})
