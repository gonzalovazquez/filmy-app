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
    var url = `http://localhost:5000/api/films`;
    alert(movie);
    return fetch(url, {
      method:'post',
      body: movie
    }).then((res) => res.json());
  },
  deleteMovie(id){
    // Delete movie
  }
};

module.exports = api;
