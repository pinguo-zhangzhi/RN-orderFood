
import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
  Animated,
  Easing,
  TouchableHighlight,
  NavigationExperimental,
  Dimensions,
  NativeModules,
  AsyncStorage
} from 'react-native'

import {OFNavigationType_login, OFNavigationType_home, OFNavigationType_list} from '../../components/appRouter/RouterAction'
const itemWidth = Dimensions.get('window').width
const itemHeight = Dimensions.get('window').height

var Storage_UserId_Key = 'Storage_UserId_Key';
var Storage_UserEmail_Key = 'Storage_UserEmail_Key';
var Storage_PushToken_Key = 'Storage_PushToken_Key';
var pushToken = '';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username:'',
      password:'',
      symbol:Symbol('isRequesting'),
      rotateValue:new Animated.Value(0),
      isLoading:false,
    }
  }

  componentDidMount(){
    this.refs.loginButton[this.state.symbol] = false;
  }

  async _requestLogin()
  {
    // this.props.pushView(OFNavigationType_home,true); return;
    let loginButton = this.refs.loginButton;
    if (loginButton[this.state.symbol] === true) {
      console.log("正在请求");
      return;
    };
    loginButton[this.state.symbol] = true;
    pushToken = this.state.username + 'and' + Date.parse(new Date());
    var result = await fetch('https://oa.camera360.com/orderfood/user/login?email=' + this.state.username + '&password=' + encodeURI(this.state.password) + '&pushToken='+pushToken+'&platform=ios');
    // let result = await fetch('https://oatest.camera360.com/orderfood/user/login?email=zhangzhi@camera360.com&password='+encodeURI('April122014')+'&pushToken='+pushToken+'&platform=ios');

    result.json().then(data => {
      loginButton[this.state.symbol] = false;
      if (data.status === 200) {
        this.props.pushView(OFNavigationType_home,true);
        loginButton[this.state.symbol] = false;
        AsyncStorage.multiSet([[Storage_UserId_Key, data.data.uId.toString()],[Storage_UserEmail_Key, data.data.email.toString()],[Storage_PushToken_Key, pushToken]])
          .then(() => console.log('Saved data to disk'))
          .catch((error) => console.log('AsyncStorage error: ' + error.message))
          .done();
      }else{
        loginButton[this.state.symbol] = false;
        Alert.alert(
            '登录失败',
            '账号或者密码不对',
        );
        this.setState({isLoading:false});
      }
    });
  }

  _onPress(){


    const {username, password} = this.state;
    if (username === '') {
      Alert.alert(
          '登录失败',
          '请输入邮箱账号',
      );
      return;
    }
    if (password === '') {
      Alert.alert(
          '登录失败',
          '请输入密码',
      );
      return;
    }
    if (this.state.isLoading) {
      return;
    }
    this.setState({isLoading:true});
    this._startAnimation();
    this._requestLogin();
  }

  _startAnimation() {
    this.state.rotateValue.setValue(0);
    var timing = Animated.timing;
    Animated.parallel(['rotateValue'].map(property => {
                return timing(this.state[property], {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            });
        })).start(() => this._startAnimation());
  }

  _userNameChange(text){
    this.setState({username: text.trim()});
  }

  _passwordChange(text){
    this.setState({password: text.trim()});
  }

  _makeLoadingView(){
    return(
        <Animated.Image
            source={require('../../assets/loading.png')}
            style={[styles.loading, {
                        top:(itemHeight - 48)/2,
                        left:(itemWidth - 48)/2,
                        transform: [{
                          rotateZ: this.state.rotateValue.interpolate({
                              inputRange: [0,1],
                              outputRange: ['0deg', '360deg']
                          })
                      }]
            }]}
          >
        </Animated.Image>
    );
  }

  _makeLoginView(){
    return(
      <View style={styles.container}>
       <Image source={require('../../assets/login_logo.png')} style={styles.backgroundImage} />
       <Text style={styles.title} >品果订餐系统</Text>
       <Text style={styles.loginText}>登录</Text>
       <TextInput style={styles.userInput} returnKeyType="done" keyboardType="email-address" numberoflines="{1}" onChangeText={this._userNameChange.bind(this)} placeholder="QQ号/手机号/邮箱" underlinecolorandroid="{'transparent'}" />
       <TextInput style={styles.passwordInput} returnKeyType="done" secureTextEntry={true} numberoflines="{1}" onChangeText={this._passwordChange.bind(this)} placeholder="密码" underlinecolorandroid="{'transparent'}" />
       <TouchableHighlight ref='loginButton'
         style={{backgroundColor:'#eaeaea'}}
         onPress={this._onPress.bind(this)}>
           <Text style={styles.button}>登录</Text>
       </TouchableHighlight>
      </View>
    );
  }

  render(){
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          {this._makeLoginView()}
          {this._makeLoadingView()}
        </View>
      );
    }
    return (
        this._makeLoginView()
    );
  }
}

const Button = ({title, onPress}) => (
  <TouchableHighlight
    style={{backgroundColor:'#eaeaea'}}
    onPress={onPress}>
      <Text ref='loginButton' style={styles.button}>{title}</Text>
  </TouchableHighlight>
)

export default Login;

const styles = StyleSheet.create({
  loading: {
    position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    marginTop:3,
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
