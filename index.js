let express = require('express');
let app = express();

let MovieStore = require('./movies.js')

let movieStore = new MovieStore();

//Direct / to /movies when user go web
app.get('/', (req, res) => {
    return res.redirect('/movies')
})

app.get('/movies', (req, res) => {
    return res.send(movieStore.all())
})

//Param title for find 

app.get('/movies/:Title/:year',(req, res) => {
    console.log(req.params);
    return res.send(req.params)
    
})

app.listen(8000, function () {
    console.log('server started at : 127.0.0.1:8000');

})
