let express = require('express');
const MovieStore = require('../Movies/movies');
let movieStore = new MovieStore();
let movieRouter = express.Router();




// //Response has pagination
// let paginate = require('../ulti/paginate')
// If have index.js ulti paginate = require('../ulti').paginate;
// app.get('/movies', (req, res) => {

//     let movies = movieStore.search(req.query.Title);

//     let page = parseInt(req.query.page) || 1,
//         size = parseInt(req.query.size) || 2;

//     let results = paginate(movies, size, page);

//     return res.json({
//         title: req.query.Title,
//         totalPage:movies.length,
//         page: page,
//         size: size,
//         payload: results
//     });
// })


movieRouter.get('/', (req, res) => {
    return res.json(movieStore.all())
})



//Param title for find 
movieRouter.get('/:Title', (req, res) => {

    //When one resquest find movie use res.params.title we use fucntion params do it
    let foundMovie = movieStore.find(req.params.Title);

    //check array length of foundmovie
    (foundMovie.length < 1)
        ? (
            res.statusCode = 404,
            res.json({
                message: 'movie not found'
            })
        )
        : res.json({
            message: 'found movie',
            payload: foundMovie.pop()
        })
})

//Post to router movies
movieRouter.post('/', (req, res) => {
    //Client json req body , we should use 1 middleware convert data from string to json
    console.log('req.body', req.body);

    //Check data if user post error data : not title or title not correct 
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400; //bad input
        res.json({
            message: "Missing or Invalid Title"
        })
    }

    //Check movie has on movieData , no need add 
    if (movieStore.has(req.body.Title)) {
        res.statusCode = 400;
        return res.json({
            message: "Movie already existed"
        });
    }

    movieStore.add(req.body);
    res.statusCode = 200;
    return res.json({
        message: 'Movie added successfully'
    })

})


//Update movie
movieRouter.put('/:Title', (req, res) => {
    console.log('req.body', req.body);
    if (!movieStore.update(req.params.Title, req.body)) {
        res.statusCode = 500;
        return res.json({
            message: 'Fail to update'
        })
    }
    res.statusCode = 200;
    return res.json({
        message: 'Update successfully'
    })
})

//Delete movie

movieRouter.delete('/:Title', (req, res) => {
    if (!movieStore.has(req.params.Title)) {
        res.statusCode = 404;
        return res.json({
            message: 'Movie not found '
        })
    }

    movieStore.remove(req.params.Title)

    res.statusCode = 200;
    return res.json({
        message: 'Delete movie successfully'
    })
})


module.exports = movieRouter;
