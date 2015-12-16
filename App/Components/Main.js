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
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350
  },
  buttonText: {
    fontSize: 24,
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
        console.log('AUTH Token' + value);
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
    //TODO
    //if auth token is present get rid of access token and alert user
    this.props.navigator.push({
        title: 'SignIn',
        component: SignIn
   });
 }
  render(){
    var image_url = 'http://freepubtrivia.com/media/2015/07/Film.jpg';
    return(
      <View style={styles.container}>
        <Image source={{ uri: image_url }} style={styles.image}/>
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
