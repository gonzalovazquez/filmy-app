var React = require('react-native');
var {
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} = React;

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center'
  },
  year: {
    textAlign: 'center'
  },
  rating: {
    textAlign: 'right'
  },
  thumbnail: {
    width: 53,
    height: 81
  }
});

class Main extends React.Component{
  render(){
    return (
      <View style={ styles.container }>
        <Image
          source={{ uri: movie.posters }}
          style={ styles.thumbnail } />
        <View style={ styles.rightContainer }>
          <Text style={ styles.title }>{ movie.title }</Text>
          <Text style={ styles.year }>{ movie.year }</Text>
          <Text style={ styles.rating }>{ movie.imdbRating }</Text>
        </View>
      </View>
    )
  }
};

module.exports = Main;
