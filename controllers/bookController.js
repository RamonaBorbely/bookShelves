const Book = require('../models/book')
//// if goes wrong cmd z until here
exports.getAllBooks = async(req, res) => {
    try {
        const booksData = await Book.find({})
        res.render('books', {books : booksData, title: 'Book list'})
        // res.status(200).json(booksData)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to get books'})
    }
}

exports.getBook = async(req, res) => {
    try {
        const bookId = req.params.id
        const book = await Book.findById({_id: bookId})
        if(!book) {
            return res.status(404).json({error: 'Book not in database'})
        }
        res.render('book', {book: book, title: `${bookId}`})
    } catch(error) {
        console.log(error)
        res.status(500).json({error: 'Failed to get book'})
    }
}

exports.postBook = async(req, res) => {
    try {
     
        const { name, image, author, format, book_depository_stars, price, currency, old_price, isbn, category} = req.body

        if(!name || !author || !book_depository_stars || !price || !category) 
            return res.status(400).json({error: 'Mising required fields'})
    

    
        // if (
        //     typeof name !== 'string' ||
        //     typeof image !== 'string' ||
        //     typeof author !== 'string' ||
        //     typeof format !== 'string' ||
        //     typeof book_depository_stars !== 'number' ||
        //     typeof price !== 'number' ||
        //     typeof currency !== 'string' ||
        //     typeof old_price !== 'number' ||
        //     typeof isbn !== 'string' ||
        //     typeof category !== 'string'
        // )
        //     return res.status(400).json({error: "Invalid data "})

    const newBook = new Book({
        name,
        image,
        author, 
        format,
        book_depository_stars,
        price,
        currency,
        old_price,
        isbn,
        category
    })


    await newBook.save()
    res.status(200).json(newBook)
       
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'An error has accured.'})
    }
}

exports.updateBook = async(req, res) => {
    try {
        const bookId = req.params.id
        const {name, image, author, format, book_depository_stars, price, currency, old_price, isbn} = req.body

        const updateBook = {
            name,
            image,
            author, 
            format,
            book_depository_stars,
            price,
            currency,
            old_price,
            isbn
        }

        const book = await Book.findByIdAndUpdate(bookId, updateBook)
        if(!book) {
            return res.status(404).json({error: 'Book does not exists'})
        }
        res.status(200).json(updateBook)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to update book'})
    }
}

exports.deleteBook = async(req, res) => {
    try {
        const bookId = req.params.id
        const book = await Book.findByIdAndRemove(bookId)
        if(!book) {
            return res.status(404).json({error: 'Book does not exists'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Failed to delete book'})
    }
}