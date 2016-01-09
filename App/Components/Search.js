var React = require('react-native');
var Movie = require('./Movie');
var api = require('../Utils/api');

var {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicatorIOS,
  AsyncStorage
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      isLoading: false,
      token: ''
    }
  }
  componentDidMount() {
    AsyncStorage.getItem("token").then((value) => {
        this.setState({"token": value});
    }).done();
  }
  handleChange(event){
    this.setState({
      title: event.nativeEvent.text
    });
  }
  handleSubmit(){
    var isAuthenticated = this.state.token !== null ? true : false;
    this.setState({
      isLoading: true
    });
    api.findMovie(this.state.title)
       .then((res) => {
         if (!res.Response) {
           this.setState({
             error: 'Movie not found',
             isLoading: false
           });
         } else {
           console.log(res, 'SEARCH');

           this.props.navigator.push({
               title: res.Title,
               component: Movie,
               passProps: {movie: res, canSave: true, isAuthenticated: isAuthenticated}
           });
           this.setState({
             isLoading: false,
             error: false,
             title: ''
           });
         }
       });
  }
  render(){
    var showErr = (
      this.state.error ? <Text>{this.state.error}</Text> : <View></View>
    );
    return(
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a movie</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.title}
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color= "#111"
          size="large">
        </ActivityIndicatorIOS>
        {showErr}
      </View>
    )
  }
};

module.exports = Search;
