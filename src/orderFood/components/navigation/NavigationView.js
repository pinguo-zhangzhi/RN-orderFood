
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

  _routeToView(OFNavigationType){
    let prevNaviState = NaviState;
    this.props.routeToView(OFNavigationType);
    if (prevNaviState !== NaviState) {
      this.setState({
        navState:NaviState
      })
    }
    return false;
  }

  _popThisView()
  {
    let prevNaviState = NaviState;
    this.props.popThisView();
    if (prevNaviState !== NaviState) {
      this.setState({
        navState:NaviState
      })
    }
    return false;
  }

  _renderScene(props){
    let prevKey = 'scene_';
    switch (props.scene.key) {
      case prevKey+OFNavigationType_login:
          return (<Login routeToView={this._routeToView.bind(this)} />);
        break;
      case prevKey+OFNavigationType_home:
          return (<Home popThisView={this._popThisView.bind(this)} />);
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
