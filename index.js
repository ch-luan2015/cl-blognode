let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let movieRouter = require('./Routes/movieRouter')

//apply middleware by use app.use()

app.use(bodyParser.json({
    type: "application/json"
}))


//GET
//Direct / to /movies when user go web
app.get('/', (req, res) => {
    return res.redirect('/movies')
})

app.use('/movies',movieRouter);
 
app.listen(5000, () => { })
