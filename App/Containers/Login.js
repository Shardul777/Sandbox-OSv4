import React, { Component } from 'react'
import { ScrollView, Text, View, TextInput,Button } from 'react-native'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginStyle'

class Login extends Component {

  static navigationOptions = {
    title : 'Home'
  };

  constructor (props) {
    super(props)
    this.state = {
      email:'',
      password:'',
      successT:false,
      errorMsg:'Wrong',
    }
  }

  emailChange = (text) => {
    //console.tron.log(text)
    this.setState({email:text})

  }

  passwordChange = (text) => {
    //console.tron.log(text)
    this.setState({password:text})
  }

  handleLogin = () => {
    //console.tron.log('Login')
    //this.props.navigation.navigate('Home')
    const { email, password } = this.state;
    if (!email) {
      window.alert('Please enter email address')
    } else if (!password) {
      window.alert('Please enter your password');
    } else {
      this.props.doLogin(email, password);
    }
  }

  componentDidMount(){
    console.tron.log('rendered updated')
    
  }

  componentWillReceiveProps(nextProps){
    //console.tron.log(this.props.errorMsg)
    //console.tron.log(nextProps.errorMsg)
    if(this.props.errorMsg!==nextProps.errorMsg){
      //console.tron.log('inside')
      this.setState({errorMsg: nextProps.errorMsg,successT:nextProps.successT});
      if(nextProps.successT!=false){
        nextProps.navigation.navigate('Home')
      }
      //console.tron.log('rendering updated')
    }

  }

  render () {
    return (
      <View style={styles.container}>
        
        <View>
          <TextInput
              style={{height:40,borderBottomWidth:1,borderBottomColor:'red'}}
              placeholder={'Enter email'}
              onChangeText={this.emailChange}
          />
        </View>
        
        <View>
          <TextInput
              style={{height:40,borderBottomWidth:1,borderBottomColor:'red'}}
              secureTextEntry
              placeholder={'Enter password'}
              onChangeText={this.passwordChange}
          />
        </View>

        <Button
          title = 'Login'
          onPress = {this.handleLogin}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
   
      successT:state.login.successT,
      errorMsg:state.login.errorMsg
  
})

const mapDispatchToProps = (dispatch) => ({
   
    doLogin: (email,password) => dispatch(LoginActions.loginRequest(email,password))
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
