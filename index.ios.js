/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var DUMMY_DATA =
[{"_id":"5611cd1f7adc830300a3f585","title":"Pulp Fiction",
"year":1994,"rated":"R","released":"1994-10-14T00:00:00.000Z",
"runtime":154,"director":"Quentin Tarantino","plot":"The lives of two mob hit men, a boxer",
"country":"USA","awards":"Won 1 Oscar. Another 63 wins & 47 nominations.",
"poster":"http://ia.media-imdb.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg",
"metascore":94,"imdbRating":8.9,"imdbVotes":1192,"imdbID":"tt0110912","response":true,"__v":0,
"language":["English"," Spanish"," French"],"actors":["Tim Roth"," Amanda Plummer"," Laura Lovelace"," John Travolta"],
"writer":[],"genre":["Crime"," Drama"]},
{"_id":"5611cd8a7adc830300a3f586","title":"RED","year":2010,"rated":"PG-13","released":"2010-10-15T00:00:00.000Z",
"runtime":111,"director":"Robert Schwentke","plot":"When his peaceful life is threatened by a high-tech assassin, former black-ops agent",
"country":"USA","awards":"Nominated for 1 Golden Globe. Another 2 wins & 16 nominations.",
"poster":"http://ia.media-imdb.com/images/M/MV5BMzg2Mjg1OTk0NF5BMl5BanBnXkFtZTcwMjQ4MTA3Mw@@._V1_SX300.jpg",
"metascore":60,"imdbRating":7.1,"imdbVotes":221870,"imdbID":"tt1245526","response":true,"__v":0,"language":["English"," Russian"],
"actors":["Bruce Willis"," Mary-Louise Parker"," Heidi von Palleske"," Karl Urban"],"writer":[],"genre":["Action"," Comedy"," Crime"]}];
var REQUEST_URL = 'https://limitless-forest-6739.herokuapp.com/api/films';
var {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

var FilmyProject = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
fetchData: function() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData),
          loaded: true,
        });
      })
      .done();
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
        <ListView
          dataSource={ this.state.dataSource }
          renderRow={ this.renderMovie }
          style={ styles.listView } />
    );
  },
    renderLoadingView: function() {
      return (
        <View style={ styles.container }>
          <Text>
            Loading movies...
          </Text>
        </View>
      );
    },
    renderMovie: function(movie) {
    return (
      <View style={ styles.container }>
        <Image
          source={{ uri: movie.posters }}
          style={ styles.thumbnail } />
        <View style={ styles.rightContainer }>
          <Text style={ styles.title }>{ movie.title }</Text>
          <Text style={ styles.year }>{ movie.year }</Text>
        </View>
      </View>
    );
  },
});

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
  thumbnail: {
    width: 53,
    height: 81
  }
});

AppRegistry.registerComponent('FilmyProject', () => FilmyProject);
