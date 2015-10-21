var React = require('react-native');

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
    console.log(this.props.movie, "BADGE");
    return(
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: this.props.movie.poster || this.props.movie.Poster }} />
        <Text style={styles.name}>{this.props.movie.title} </Text>
      </View>
    )
  }
};

Badge.propTypes = {
  movie: React.PropTypes.object.isRequired
}

module.exports = Badge;
