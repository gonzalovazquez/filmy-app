var React = require('react-native');
var Separator = require('../Helpers/Separator');
var Movie = require('../Movie');

var {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  year: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

class Library extends React.Component{
  selectFilm(movie){
    this.props.navigator.push({
      title: movie.title,
      component: Movie,
      passProps: { movie: movie },
      canSave: false
   });
  }
  render(){
    var movies = this.props.movies;
    var list = movies.map((item, index) => {
      return(
        <View key={index}>
          <View style={styles.rowContainer}>
          <TouchableHighlight
            onPress={this.selectFilm.bind(this, movies[index])}
            underlayColor='transparent'>
            <Text style={styles.name}>{movies[index].title}</Text>
          </TouchableHighlight>
          <Text stlye={styles.year}>{movies[index].year}</Text>
          </View>
          <Separator />
        </View>
      )
    });
    return(
      <ScrollView style={styles.container}>
        {list}
      </ScrollView>
    )
  }
};

Library.propTypes = {
  movies: React.PropTypes.array.isRequired
};

module.exports = Library;
