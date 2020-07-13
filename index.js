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

app.get('/users', db.getUsers)
app.get('/user/:id', db.getUserById)
app.post('/user', db.createUser)
app.put('/user/:id', db.updateUser)
app.delete('/user/:id', db.deleteUser)


//GET
//Direct / to /movies when user go web
// app.get('/', (req, res) => {
//     return res.redirect('/movies')
// })

// app.use('/movies',movieRouter);
 
app.listen(port, () => { })
