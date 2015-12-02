var React = require('react-native');

var {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableHighlight
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
      username: '',
      password: ''
    }
  }
  handleChange(event){
    this.setState({
      title: event.nativeEvent.text
    });
  }
  submitLogin() {

  }

  submitSign() {

  }
  render(){
    return(
      <View style={styles.mainContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          placeholder="Login"
          onChange={this.handleChange.bind(this)} />
        <TextInput
          style={styles.searchInput}
          value={this.state.password}
          placeholder="SignUp"
          onChange={this.handleChange.bind(this)} />
      </View>
    )
  }
};

module.exports = SignIn;
