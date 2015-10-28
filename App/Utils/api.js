var transformPayload = require('./transformRequest');

var api = {
  getMovies(){
    var url = `https://limitless-forest-6739.herokuapp.com/api/films`;
    return fetch(url).then((res) => res.json());
  },
  findMovie(title){
    var title = title.replace(" ", '%20');
    var url = `https://limitless-forest-6739.herokuapp.com/api/?title=${title}`;
    return fetch(url).then((res) => res.json());
  },
  addMovie(movie){
    var url = `https://limitless-forest-6739.herokuapp.com/api/films`;
    var tPayload = transformPayload(movie);
    return fetch(url, {
      method: 'post',
      headers: {
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
    var url = `https://limitless-forest-6739.herokuapp.com/api/films/${id}`;
    return fetch(url, { method: 'delete'}).then((res) => res.json());
  }
};

module.exports = api;
