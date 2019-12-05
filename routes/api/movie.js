const express = require('express')
const router = express.Router()
const Movie = require('../../models/movie')
const validator = require('../../validations/movieValidations')
var axios = require('axios');
const url = require('url');
const querystring = require('querystring');

/*router.get('/', async (req, res) => {
  Movie.find().then((movies) => {
    res.send({ movies })
  }, (err) => {
    res.status(400).send(err)
  })
})*/
router.get('/', async (req, res) => {
    Movie.find().then((movies) => {
        res.render('index', { movies })
    }, (err) => {
        res.status(400).send(err)
    })
})

/*router.get('/:id', async (req, res) => {
    
  try {
     const movieId = req.params.id 
    const movieInstance = await Movie.findById(movieId)
    if (!movieInstance) {
      res.status(400).send({ error: 'not found' })
    } else {
      res.json({ movie: movieInstance })
    }
  } catch (error) {
    res.status(400).send({ error: 'error' })
  }
})*/



//router.post('/', async (req, res) => {
//   try {
//       const isValidated = validator.createValidation(req.body)
//       if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
//       Movie.create(req.body).then((newMovie) => {
//       res.json({ message: 'Movie was created successfully', data: newMovie })
//     }, (err) => { res.status(400).send(err) })
//   } catch (error) {
//     res.status(400).send({ error: 'Error' })
//   }
           
//})
router.post('/', async (req, res) => {
    try {
        const isValidated = validator.createValidation(req.body)
        if (isValidated.error) return res.status(400).json({ error: isValidated.error.details[0].message })
        Movie.create(req.body).then(movie => res.redirect('/api/movie'))
    } catch (error) {
        res.status(400).json({ error: 'Error' })
    }

})

router.put('/:id', async (req, res) => {
  try {
    const movieId = req.params.id
    const movieInstance = await Movie.findById(movieId)
    if (!movieInstance) {
        res.status(404).json({ error: 'not found' })
    }
    const isValidated = validator.updateValidation(req.body)
      if (isValidated.error) {
          res.status(400).json({ error: isValidated.error.details[0].message })
      } else {
          await Movie.findByIdAndUpdate(movieId, req.body)
          res.redirect('/api/movie')
          //res.json({ message: 'updated successfuly' })
      }
} catch (error) {
    res.status(400).send({ error: 'error' })
}
})


router.post('/delete/:id', async (req, res) => {
    try {
        const movieId = req.params.id
        await Movie.findByIdAndRemove(movieId).then(res.redirect('/api/movie'))
    } catch (error) {
        res.status(404).json({ error: 'error' })
    }
})

router.delete('/:id', async (req, res) => {
  try {
      const movieId = req.params.id
      await Movie.findByIdAndRemove(movieId)
      res.json({ message: 'Deleted successfully' })
  } catch (error) {
      res.status(404).send({ error: 'error' })
  }
})


//router.get('/searchB/:title', async (req, res) => {
//    console.log('here')
//    const movieTitle = req.params.title
//    console.log(movieTitle)
//    axiosTest(movieTitle).then(data => {
//        res.render('rating', { data })
//    })
//})
router.get('/searchB/', async (req, res) => {
    console.log('here')
    const movieTitle = req.query.title
    console.log(movieTitle)
    axiosTest(movieTitle).then(data => {
        res.render('rating', { data })
    })
})

function axiosTest(movieTitle) {
    key = process.env.APIkey
    return axios.get('http://www.omdbapi.com/?apikey=' + key + '&t=' + movieTitle).then(response => {
        return response.data.Ratings[0].Value
    })
}



module.exports = router