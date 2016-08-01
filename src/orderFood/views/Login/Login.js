
import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  NavigationExperimental,
  Dimensions
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'
const itemWidth = Dimensions.get('window').width

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  _onPress(){
    this.props.pushView(OFNavigationType_home, true);
  }

  render(){
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/login_logo.png')} style={styles.backgroundImage} />
        <Text style={styles.title} >品果订餐系统</Text>
        <Text style={styles.loginText}>登录</Text>
        <TextInput style={styles.userInput} returnKeyType="done" keyboardType="email-address" numberoflines="{1}" onChangeText={()=>{}} placeholder="QQ号/手机号/邮箱" underlinecolorandroid="{'transparent'}" />
        <TextInput style={styles.passwordInput} returnKeyType="done" secureTextEntry={true} numberoflines="{1}" placeholder="密码" underlinecolorandroid="{'transparent'}" />
        <Button onPress={this._onPress.bind(this)} title="登录" />
      </View>
    )
  }
}

const Button = ({title, onPress}) => (
  <TouchableHighlight
    style={{backgroundColor:'#eaeaea'}}
    onPress={onPress}>
      <Text style={styles.button}>{title}</Text>
  </TouchableHighlight>
)

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    alignItems:'center'
  },
  backgroundImage:{
    width:100,
    height:100,
    marginTop:40
  },
  title: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color:'#4b4b4b'
  },
  loginText:{
    width:itemWidth,
    fontSize:12,
    marginTop:50,
    marginLeft:15,
    textAlign:'left',
    color:'#4b4b4b'
  },
  userInput:{
    width:itemWidth,
    height:40,
    fontSize:12,
    backgroundColor:'white',
    marginTop:10,
    textAlign:'center',
    alignSelf:'center'
  },
  passwordInput:{
    width:itemWidth,
    height:40,
    fontSize:12,
    backgroundColor:'white',
    marginTop:5,
    textAlign:'center',
    alignSelf:'center'
  },
  button: {
    width: itemWidth*0.95,
    height: 45,
    lineHeight:28,
    marginTop: 15,
    backgroundColor: '#dd4f45',
    fontSize:14,
    color:'#ae0303',
    textAlign:'center',
    borderRadius:2
  }
})
