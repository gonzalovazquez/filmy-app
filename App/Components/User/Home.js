var React = require('react-native');
var api = require('../../Utils/api');
var Library = require('./Library');
var Search = require('../Search');

var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicatorIOS
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

class Home extends React.Component{
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
  viewLibrary(){
      this.props.navigator.push({
             title: 'Library',
             component: Library,
             passProps: {
               username: this.props.user.username,
               movies: this.props.user.movies
             }
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
          onPress={this.viewLibrary.bind(this)}
          underlayColor='#88D4F5'>
          <Text style={styles.buttonText}> View Library </Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = Home;