var React = require('react-native');
var Separator = require('../Helpers/Separator');
var Main = require('../Main');

var {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  AsyncStorage
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

class Profile extends React.Component{
  componentDidMount() {
    console.log(this.props);
  }
  logout() {
    AsyncStorage.removeItem("token").then((value) => {
      this.props.navigator.popToTop();
    }).done();
  }
  render(){
    var avatar = 'data:image/png;base64,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';
    return(
      <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: avatar }} />
      </View>
        <View>
        <View style={styles.rowContainer}>
          <Text style={styles.rowTitle}>Username</Text>
          <Text style={styles.rowContent}> {this.props.username} </Text>
        </View>
        <Separator />
          <View style={styles.rowContainer}>
            <Text style={styles.rowTitle}>Email Address</Text>
            <Text style={styles.rowContent}> {this.props.email} </Text>
          </View>
          <Separator />
        </View>
        <TouchableHighlight
            style={styles.button}
            onPress={this.logout.bind(this)}
            underlayColor="white">
              <Text style={styles.buttonText}> Logout </Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
};

Profile.propTypes = {
  username: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired
};

module.exports = Profile;
