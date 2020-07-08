

class MovieStore {

    constructor() {
        this.movieData = require('./movies.json')
    }

    all() {
        return this.movieData;
    }

    find(Title){
        return this.movieData.filter(m=>m.Title===Title)
    }

    add(movie){
        let newMovie=movie;
        return this.movieData.push(newMovie);

    }

    has(title){
        let movie = this.find(title);

        return movie.length > 0
    }

    update(title, newInfo){
        //Check movie has , 0 return false

        let movies = this.find(title);
        if(movies.length<1){
            return false;
        }

        let oldMovie= movies.pop();
        let newMovie= Object.assign(oldMovie, newInfo);

        let oldMoviesList = this.movieData.filter(m=>m.Title !== title);

        this.movieData = [...oldMoviesList, newMovie];

        return true;

    }

}

module.exports = MovieStore;
