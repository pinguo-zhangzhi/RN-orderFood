
import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  Animated,
  NavigationExperimental as Navigation
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list, NaviState} from '../appRouter/RouterAction'
import RouterReducer from '../appRouter/RouterAction'
import Login from '../../views/Login/Login'
import Home from '../../views/Home/Home'

const {
 CardStack: NavigationCardStack,
 StateUtils: NavigationStateUtils
} = Navigation

class NavigationView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navState: RouterReducer({
        index: 0,
        key: 'OrderFood',
        routes: [{key: OFNavigationType_login}]}, {}),
      animated:true
    }
  }

  _pushView(OFNavigationType, animated){
    let prevNaviState = NaviState;
    this.props.pushView(OFNavigationType);
    if (prevNaviState !== NaviState) {
      this.setState({
        navState:NaviState,
        animated:animated === null?false:animated
      })
    }
  }

  _popView(animated)
  {
    let prevNaviState = NaviState;
    this.props.popView();
    if (prevNaviState !== NaviState) {
      this.setState({
        navState:NaviState,
        animated:animated === null?false:animated
      })
    }
  }

  _renderScene(props){
    let prevKey = 'scene_';
    switch (props.scene.key) {
      case prevKey+OFNavigationType_login:
          return (<Login pushView={this._pushView.bind(this)} />);
        break;
      case prevKey+OFNavigationType_home:
          return (<Home popView={this._popView.bind(this)} />);
        break;
      case prevKey+OFNavigationType_list:

        break;
      default:
        return (<View />);
    }

  }

  _renderNavigationCard(props){
    return (
      <Navigation.Card
        {...props}
        key={props.scene.route.key}
        renderScene={this._renderScene.bind(this)}
       />
    )
  }

  _navigationCompleted(){
    console.log('_navigationCompleted')
  }

  render() {
    return (
      <Navigation.AnimatedView
        style={{flex: 1}}
        navigationState={this.state.navState}
        renderScene={this._renderNavigationCard.bind(this)}
        applyAnimation={function(pos, navState){
          if (this.state.animated) {
            Animated
              .spring(pos, {toValue: navState.index, duration:200, bounciness: 0})
              .start(function(){
                this._navigationCompleted();
              }.bind(this));
          }else{
            Animated
              .timing(pos, {toValue: navState.index, duration:0, bounciness: 0})
              .start(function(){
                this._navigationCompleted();
              }.bind(this));
          }

        }.bind(this)}
       />
    )
    // return (
    //   <NavigationCardStack
    //     navigationState={this.state.navState}
    //     //onNavigate={this._handleAction.bind(this)}
    //     renderScene={this._renderScene.bind(this)} />
    // )
  }
}

export default NavigationView;
