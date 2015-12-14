var transformPayload = require('./transformRequest');

const HOSTNAME = 'http://localhost:5000/api/';
//const HOSTNAME = 'https://limitless-forest-6739.herokuapp.com/api/';

var api = {
  authenticateUser(user) {
    console.log(user);
    var url = `http://localhost:5000/authenticate`
    return fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    }).then((res) => {
      console.log(res);
      return res.json();
    })
  },
  getMovies(token){
    var url = `http://localhost:5000/me`;
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
    var url = `http://localhost:5000/api/?title=${title}`;
    return fetch(url).then((res) => res.json());
  },
  addMovie(token, movie){
    var url = `http://localhost:5000/api/films`;
    var tPayload = transformPayload(movie);
    return fetch(url, {
      method: 'post',
      headers: {
        "Authorization": token,
        "Content-type": "application/json"
      },
      body: JSON.stringify(tPayload)
    }).then((res) => {
      if (res._bodyInit === 'Film already exists') {
        return 'Film already exists';
      } else {
        return res.json()
      }
    });
  },
  deleteMovie(id){
    var url = `http://localhost:5000/api/films/${id}`;
    return fetch(url, { method: 'delete'}).then((res) => res.json());
  }
};

module.exports = api;
