let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let MovieStore = require('./movies.js')
let movieStore = new MovieStore();

//apply middleware by use app.use()

app.use(bodyParser.json({
    type: "application/json"
}))

//Direct / to /movies when user go web
app.get('/', (req, res) => {
    return res.redirect('/movies')
})

app.get('/movies', (req, res) => {
    return res.send(movieStore.all())
})

//Param title for find 
app.get('/movies/:Title', (req, res) => {

    //When one resquest find movie use res.params.title we use fucntion params do it
    let foundMovie = movieStore.find(req.params.Title);

    //check array length of foundmovie
    (foundMovie.length < 1)
        ? (
            res.statusCode = 404,
            res.send({
                message: 'movie not found'
            })
        )
        : res.send({
            message: 'found movie',
            payload: foundMovie.pop()
        })
})

//Post to router movies
app.post('/movies', (req, res) => {
    //Client send req body , we should use 1 middleware convert data from string to json
    console.log('req.body', req.body);

    //Check data if user post error data : not title or title not correct 
    if (!req.body.Title || req.body.Title.trim().length < 1) {
        res.statusCode = 400; //bad input
        res.send({
            message:"Missing or Invalid Title"
        })
    }

    //Check movie has on movieData , no need add 
    if(movieStore.has(req.body.Title)){
        res.statusCode = 400;
        return res.send({
            message: "Movie already existed"
        });
    }

    movieStore.add(req.body);
    res.statusCode = 200;
    return res.send({
        message: 'Movie added successfully'
    })

})


//Update movie
app.put('/movies', (req, res) => {
    console.log('req.body', req.body);

   

    if(!movieStore.update(req.params.Title,req.body)){
        res.statusCode = 500; 
        return res.send({
            message: 'Fail to update'
        })
    }
    res.statusCode = 200;
    return res.send({
        message: 'Update successfully'
    })

})




app.listen(5000,()=>{})
