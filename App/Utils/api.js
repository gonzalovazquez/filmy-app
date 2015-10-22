var transformPayload = require('./transformRequest');

var api = {
  getMovies(){
    console.log('Get movie');
    var url = `http://limitless-forest-6739.herokuapp.com/api/films`;
    return fetch(url).then((res) => res.json());
  },
  findMovie(title){
    var title = title.replace(" ", '%20');
    var url = `https://limitless-forest-6739.herokuapp.com/api/?title=${title}`;
    console.log(url);
    return fetch(url).then((res) => res.json());
  },
  addMovie(movie){
    var url = `http://limitless-forest-6739.herokuapp.com/api/films`;
    var tPayload = transformPayload(movie);
    return fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(tPayload)
    }).then((res) => res.json());
  },
  deleteMovie(id){
    // Delete movie
  }
};

module.exports = api;
