var React = require('react-native');
var api = require('../Utils/api');
var Dashboard = require('./User/Dashboard');

var {
  StyleSheet,
  Text,
  View,
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

class SignUp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      username: ''
    }
  }
  setEmail(event){
    this.setState({
      email: event.nativeEvent.text
    });
  }
  setUsername(event){
    this.setState({
      username: event.nativeEvent.text
    });
  }
  setPassword(event){
    this.setState({
      password: event.nativeEvent.text
    });
  }
  submit(event){
    this.setState({
      isLoading: true
    });

    api.registerUser(this.state)
      .then((res) => {

        if (!res.type) {
          return alert(res.data)
        }

        this.setState({
            isLoading: false
        });

        this.props.navigator.push({
            title: 'Dashboard',
            component: Dashboard,
            passProps: { token: res.token, user: res.data }
        });
        console.log(res.token);
        AsyncStorage.setItem('token', res.token);
      })
  }
  render(){
    return(
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder="username"
          autoCapitalize="none"
          onChange={this.setUsername.bind(this)} />
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          placeholder="password"
          autoCapitalize="none"
          secureTextEntry="true"
          onChange={this.setPassword.bind(this)} />
          <TextInput
            style={styles.searchInput}
            value={this.state.email}
            placeholder="email"
            autoCapitalize="none"
            keyboardType="email-address"
            onChange={this.setEmail.bind(this)} />
          <TouchableHighlight
              style={styles.button}
              onPress={this.submit.bind(this)}
              underlayColor="white">
                <Text style={styles.buttonText}> Submit </Text>
          </TouchableHighlight>
      </View>
    )
  }
};

module.exports = SignUp;
