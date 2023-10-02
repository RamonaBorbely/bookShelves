const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    format: {
        type: String
    },
    book_depository_stars: {
        type: Number,
        require: true
    },

    price: {
        type: Number,
        require: true 
    },
    currency: String,
    old_price: {
        type: Number,
    },
    isbn: String,

    category: {
        type: String,
        require: true
    },
    img_paths: {
        type: String,
    },
   
})

module.exports = mongoose.model('Book', bookSchema)