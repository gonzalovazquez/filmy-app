var React = require('react-native');
var api = require('../../Utils/api');
var Library = require('./Library');
var Search = require('../Search');
var Profile = require('./Profile');

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
    width: 380,
    height: 300,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component{
  componentDidMount() {
    AsyncStorage.getItem("token").then((value) => {
        this.setState({"token": value});
        if (!value) {
          this.props.navigator.popToTop();
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
      case 2:
        obj.backgroundColor='#E45345';
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
  viewLibrary(){
      api.getMovies(this.state.token)
        .then((res) => {
          console.log(res);
          if (!res.type) {
            alert('Could not fetch your libary');
          }
          this.props.navigator.push({
            title: 'Library',
            component: Library,
            passProps: {
              username: res.data.username,
              movies: res.data.movies
            }
          });
          // TODO
          // Add loading false
     });
  }
  profile(){
    api.getMovies(this.state.token)
      .then((res) => {
        if (!res.type) {
          alert('Could not fetch your libary');
        }
        this.props.navigator.push({
          title: 'Profile',
          component: Profile,
          passProps: {
            email: res.data.email,
            username: res.data.username
          }
        });
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
          onPress={this.viewLibrary.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}> View Library </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.profile.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = Dashboard;
