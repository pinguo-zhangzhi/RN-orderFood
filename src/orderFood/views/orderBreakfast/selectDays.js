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
  NavigationExperimental
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'

let urlPath = 'https://oa.camera360.com/orderfood/order/GetAllowTime'

var NUM_ITEMS = 6;

var Home = React.createClass({

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (

        <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeparator}
        />
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
    return (
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData}
            </Text>
        </View>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    dataBlob[0] = '周一';
    dataBlob[1] = '周二';
    dataBlob[2] = '周三';
    dataBlob[3] = '周四';
    dataBlob[4] = '周五';
    dataBlob[5] = '周六';
    dataBlob[6] = '周日';
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

export default Home;

var THUMB_URLS = [
  require('../../assets/mt.png'),
  ];
var LOREM_IPSUM = '周';

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

const styles = StyleSheet.create({
  listView: {
    flex:1,
    marginTop:40
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
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
})
