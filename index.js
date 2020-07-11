let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let movieRouter = require('./Routes/movieRouter');
const db = require('./myapi/queries');
const port = 5000 ;

//apply middleware by use app.use()
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )

app.use(bodyParser.json({
    type: "application/json"
}))

app.get('/', (request, response) => {
    response.json({Welcome: 'How to create API with Node.js,EXPRESS and PostgreSQL' })
  })
//End points

app.get('/countries', db.getCountries)
app.get('/countries/:id', db.getCountryById)
app.post('/countries', db.createCountry)
app.put('/countries/:id', db.updateCountry)
app.delete('/countries/:id', db.deleteCountry)//GET
//Direct / to /movies when user go web
// app.get('/', (req, res) => {
//     return res.redirect('/movies')
// })

// app.use('/movies',movieRouter);
 
app.listen(port, () => { })
