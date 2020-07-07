

class MovieStore {

    constructor(){
        this.movieData=require('./movies.json')
    
    }

    all(){
        return this.movieData;
    }

}

module.exports=MovieStore;
