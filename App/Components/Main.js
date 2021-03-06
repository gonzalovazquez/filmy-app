var React = require('react-native');
var api = require('../Utils/api');
var Search = require('./Search');
var SignIn = require('./SignIn');
var Dashboard = require('./User/Dashboard.js');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1
  },
  image: {
    width: 380,
    height: 300
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    alignSelf: 'center'
  }
});

class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movies: {},
      isLoading: false,
      token: ''
    }
  }
  componentDidMount() {
    AsyncStorage.getItem("token").then((value) => {
        console.log(value);
        if (value) {
          this.props.navigator.replace({
              title: 'Dashboard',
              component: Dashboard
          });
        }
    }).done();
  }
  makeBackground(btn){
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    switch(btn){
      case 0:
        obj.backgroundColor='#48BBEC';
        break;
      case 1:
        obj.backgroundColor='#E77AAE';
        break;
    }

    return obj;
  }
  findMovie() {
    this.props.navigator.push({
      title: 'Search',
      component: Search
   });
  }
  signIn(){
    this.props.navigator.push({
        title: 'Sign In',
        component: SignIn
   });
 }
  render(){
    return(
      <View style={styles.container}>
        <Image source={{uri: 'http://gvazquez.webfactional.com/filmy/loading-screen.png'}} style={styles.image}/>
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.findMovie.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}> Find Movie </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.signIn.bind(this)}
          underlayColor="#88D4F5">
          <Text style={styles.buttonText}> Sign In </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color= "#111"
          size="large">
        </ActivityIndicatorIOS>
      </View>
    )
  }
};

module.exports = Main;
