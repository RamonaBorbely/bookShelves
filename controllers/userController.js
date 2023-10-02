const User = require('../models/user')
const Book = require('../models/book')
const UserBooks = require('../models/userBooks')
const userBooks = require('../models/userBooks')

exports.getAllBookList = async(req, res) => {
    try {
        const userBooksList = await UserBooks.findOne({userId: req.user._id}).populate('books')
        if(!userBooksList || !userBooksList.books) {
            return res.render('mybooks', {books: [], error: 'List empty', title: 'My books'})
        }
        res.render('mybooks', {books: userBooksList.books, title: 'My Books'})

    } catch(err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}

exports.addBookToList = async(req, res) => {
    try {
        const bookId = req.params.id 
        let userBooksList = await UserBooks.findOne({userId: req.user._id})

        if(!userBooksList) {
            userBooksList = new UserBooks({userId: req.user._id})
        }

        if(userBooksList.books.includes(bookId)) {
            return res.render('mybooks', {error: 'Book is already in list', books: userBooksList.books, title: 'My books'})
        }
        userBooksList.books.push(bookId)
        await userBooksList.save()

        res.redirect('/mybooks') // maybe not
    } catch(err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}

// delete just reference from user list
exports.removeBookFromList = async (req, res) => {
    try {
        const bookId = req.params.id
        const userBooksList = await UserBooks.findOne({userId: req.user._id})

        if(userBooksList && userBooksList.books) {
            //  is too much to think could be -1, not found ?
            const index = userBooksList.books.indexOf(bookId)
            if(index > -1) {
                userBooksList.books.splice(index, 1)
                await userBooksList.save()
            }
        }

        res.redirect('/mybooks')
    } catch(err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}

exports.clearList = async (req, res) => {
    try {
        const userBooksList = await UserBooks.findOne({userId: req.user._id})

        if(userBooksList) {
            userBooksList.books = []
            await userBooksList.save()
        }
        res.redirect('/mybooks')
    } catch(err) {
        console.log(err)
        res.status(500).send('Server error')
    }
}

