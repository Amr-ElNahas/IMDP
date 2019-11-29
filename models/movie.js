const mongoose = require('mongoose')
const Schema = mongoose.Schema

let movieSchema = new Schema({
    movieName: { type: String, required: true, max: 100, unique: true },
    personalRating: { type: Number, required: true }
})
module.exports = Movie = mongoose.model('Movie', movieSchema)