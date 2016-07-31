
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

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'

const Button = ({title, onPress}) => (
  <TouchableHighlight
    underlayColor='#EFEFEF'
    onPress={onPress}
    style={styles.button}>
      <Text>{title}</Text>
  </TouchableHighlight>
)

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _onPress(){
    this.props.popThisView();
  }

  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.title} >Hello From Home</Text>
        <Button onPress={this._onPress.bind(this)} title="pop to login view" />
      </View>
    )
  }
}

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 40,
    marginTop: 200,
    textAlign: 'center',
    color:'black'
  },
  button: {
    height: 70,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#EDEDED'
  }
})
