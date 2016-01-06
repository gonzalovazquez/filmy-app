var React = require('react-native');
var GLOBAL = require('../Utils/Global');

var {
  Image,
  Text,
  StyleSheet,
  View
} = React;

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#48BBEC',
    paddingBottom: 10
  },
  name: {
    alignSelf: 'center',
    fontSize: 21,
    marginTop: 10,
    marginBottom: 5,
    color: 'white'
  },
  image: {
    height: 125,
    width: 125,
    borderRadius: 65,
    marginTop: 10,
    alignSelf: 'center'
  }
});

class Badge extends React.Component{
  render(){
    var placeholderImage = GLOBAL.BASE_URL + 'img/movie_place_holder.jpg';
    var poster = this.props.movie.poster || this.props.movie.Poster;
    var posterURI = poster === 'N/A' ? placeholderImage : poster
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: posterURI }} />
        <Text style={styles.name}>{this.props.movie.title || this.props.movie.Title} </Text>
      </View>
    )
  }
};

Badge.propTypes = {
  movie: React.PropTypes.object.isRequired
}

module.exports = Badge;
