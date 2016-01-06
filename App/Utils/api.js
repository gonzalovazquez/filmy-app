var transformPayload = require('./transformRequest');
var GLOBAL = require('./Global');

var api = {
  registerUser(user){
    var url = `${GLOBAL.BASE_URL}signIn`
    return fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((res) => {
      return res.json();
    })
  },
  authenticateUser(user) {
    var url = `${GLOBAL.BASE_URL}authenticate`
    return fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((res) => {
      return res.json();
    })
  },
  getMovies(token){
    var url = `${GLOBAL.BASE_URL}me`;
    return fetch(url,
    {
      method: 'get',
      headers: {
        "Authorization": token,
      }
    }).then((res) => res.json());
  },
  findMovie(title){
    var title = title.replace(" ", '%20');
    var url = `${GLOBAL.BASE_URL}api/?title=${title}`;
    return fetch(url).then((res) => res.json());
  },
  addMovie(token, movie){
    var url = `${GLOBAL.BASE_URL}api/films`;
    var tPayload = transformPayload(movie);
    var token = token;
    return fetch(url, {
      method: 'post',
      headers: {
        "Authorization": token,
        "Content-type": "application/json"
      },
      body: JSON.stringify(tPayload)
    }).then((res) => {
      if (res._bodyInit === 'Movie already exists') {
        return false;
      } else {
        return res.json()
      }
    });
  },
  deleteMovie(token, id){
    var url = `${GLOBAL.BASE_URL}api/films/${id}`;
    return fetch(url, {
      method: 'delete',
      headers: {
        "Authorization": token
      }
      }).then((res) => {
        return res.status === 200 ? true : false;
      });
    }
};

module.exports = api;
