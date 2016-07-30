
import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  NavigationExperimental
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list, NaviState} from '../appRouter/RouterAction'
import RouterReducer from '../appRouter/RouterAction'
import Login from '../../views/Login/Login'
import Home from '../../views/Home/Home'

const {
 CardStack: NavigationCardStack,
 StateUtils: NavigationStateUtils
} = NavigationExperimental

class NavigationView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navState: RouterReducer({
        index: 0,
        key: 'OrderFood',
        routes: [{key: OFNavigationType_login}]}, {})
    }
  }

  _gotoHomeView(props){
    let prevNaviState = NaviState;
    props.routeToView(OFNavigationType_home);
    if (prevNaviState !== NaviState) {
      this.setState({
        navState:NaviState
      })
    }
    return false;
  }

  _renderScene(props){
    console.log(this.props);
    let prevKey = 'scene_';
    switch (props.scene.key) {
      case prevKey+OFNavigationType_login:
          return (<Login gotoHomeView={this._gotoHomeView.bind(this, this.props)} />);
        break;
      case prevKey+OFNavigationType_home:
          return (<Home />);
        break;
      case prevKey+OFNavigationType_list:

        break;
      default:
        return (<View text='fuck your mather' />);
    }

  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.state.navState}
        //onNavigate={this._handleAction.bind(this)}
        renderScene={this._renderScene.bind(this)} />
    )
  }
}

export default NavigationView;
