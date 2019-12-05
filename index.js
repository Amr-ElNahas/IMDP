/** * npm modules ***/
const dotenv = require('dotenv')
dotenv.config() // Setting env variables
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

/** * project modules ***/
// eg: const reviewers = require('./routes/api/reviewer')
const movies = require('./routes/api/movie')

/** * global constants ***/
const app = express()
const db = process.env.mongoURI
app.set('view engine', 'ejs');


mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('Connected to Database'))
  .catch(err => console.log(err))

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))



//IMPORTANT!!!! DO NOT REMOVE
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,  Authorization");
  next();
});


// Adding routes
//eg: app.use('/api/reviewer', reviewers)
app.use('/api/movie', movies)



/** * Adding temporary index page ***/
app.get('/', (req, res) => { res.send('<h1>IMDP</h1>\n<h3>Index Page<h3>\n<a href=/api/movie>movies</a>') })
/** * Custom routing for wrong requests ***/
app.use((req, res) => {
  res.status(404).send({ error: 'this page does not exist' })
})
/** * Listening on serverport ***/
app.listen(port, () => console.log(`Server up. Listening on port ${port}`))