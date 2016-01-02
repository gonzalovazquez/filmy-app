var React = require('react-native');
var api = require('../Utils/api');
var SignUp = require('./SignUp');
var Dashboard = require('./User/Dashboard.js');

var {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableHighlight,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class SignIn extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      token: ''
    }
  }
  updateEmail(event){
    this.setState({
      email: event.nativeEvent.text
    });
  }
  updatePassword(event){
    this.setState({
      password: event.nativeEvent.text
    });
  }
  signIn(event){
    this.setState({
      isLoading: true
    });

    api.authenticateUser(this.state)
        .then((res) => {
          console.log(res);
          if (!res.type) {
            console.log('Incorrect password');
            return alert('Wrong username or password');
          }

          AsyncStorage.setItem('token', res.token);

          this.props.navigator.push({
              title: 'Dashboard',
              component: Dashboard,
              passProps: { token: res.token, user: res.data }
          });

          this.setState({
              isLoading: false
          });
        });
  }
  signUp(){
    this.props.navigator.push({
        title: 'SignUp',
        component: SignUp
    });
  }
  render(){
    return(
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.email}
          placeholder="Type email address"
          autoCapitalize="none"
          keyboardType="email-address"
          onChange={this.updateEmail.bind(this)} />
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          placeholder="Type password"
          autoCapitalize="none"
          onChange={this.updatePassword.bind(this)} />
        <TouchableHighlight
            style={styles.button}
            onPress={this.signIn.bind(this)}
            underlayColor="white">
              <Text style={styles.buttonText}> SignIn </Text>
        </TouchableHighlight>
        <TouchableHighlight
            style={styles.button}
            onPress={this.signUp.bind(this)}
            underlayColor="white">
              <Text style={styles.buttonText}> SignUp </Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = SignIn;
