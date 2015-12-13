var React = require('react-native');
var Badge = require('./Badge.js');
var Library = require('./User/Library.js');
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
    return title[0] ? title[0].toUpperCase() + title.slice(1): title;
  }
  getTitle(item){
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }
  handleSubmit(){
    api.addMovie(this.props.movie)
        .then((res) => {
            if (res === 'Film already exists') {
              return alert('Film already exists');
            } else {
              return alert('SAVED');
            }
        });
  }
  handleDelete(){
    api.deleteMovie(this.props.movie.imdbID)
      .then((res) => {
        this.props.navigator.pop();
        //TODO
        //When returning to previous screen figure out how to refresh
      });
  }
  render(){
    var showSave;
    if (this.props.isAuthenticated) {
      showSave = (
        this.props.canSave ? <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#48BBEC"><Text style={styles.buttonText}> SAVE </Text></TouchableHighlight> :
        <TouchableHighlight style={styles.button} onPress={this.handleDelete.bind(this)} underlayColor="#48BBEC"><Text style={styles.buttonText}>DELETE </Text></TouchableHighlight>
      );
    }
    var movie = this.props.movie;
    var topicArr = ['director', 'year', 'rated', 'plot', 'country', 'awards', 'imdbRating'];
    var list = topicArr.map((item, index) => {
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
        {showSave}
      </ScrollView>
    )
  }
};

Movie.propTypes = {
  movie: React.PropTypes.object.isRequired
};

module.exports = Movie;
