var React = require('react-native');
var Badge = require('./Badge.js');
var Separator = require('./Helpers/Separator');
var api = require('../Utils/api');

var {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#758BF4',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 0,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class Movie extends React.Component{
  getRowTitle(title){
    console.log(title[0].toUpperCase() + title.slice(1));
    return title[0] ? title[0].toUpperCase() + title.slice(1): title;
  }
  getTitle(item){
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
  handleSubmit(){
      console.log('SAVE');
      api.addMovie(this.props.movie)
          .then((res) => {
              console.log(res);
              alert('SAVED');
          });
  }
  render(){
    var movie = this.props.movie;
    console.log(movie, 'MOVIE');
    var topicArr = ['director', 'year', 'rated', 'plot', 'country', 'awards', 'imdbRating'];
    var list = topicArr.map((item, index) => {
      console.log(item, movie[item]);
      if (!movie[item]) {
        item = this.getTitle(item);
      }
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>{this.getRowTitle(item)}</Text>
            <Text style={styles.rowContent}> {movie[item]} </Text>
          </View>
          <Separator />
        </View>
      )
    });
    return(
      <ScrollView style={styles.container}>
        <Badge movie={this.props.movie} />
        {list}
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="#48BBEC">
            <Text style={styles.buttonText}> SAVE </Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
};

Movie.propTypes = {
  movie: React.PropTypes.object.isRequired
};

module.exports = Movie;
