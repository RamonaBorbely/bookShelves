
const express = require('express')

const booksRoutes = require('./books')
const usersRoutes = require('./users')
const authRoutes = require('./auth')

const router = express.Router()

router.use('/books', booksRoutes)
router.use('/', usersRoutes)
router.use('/auth', authRoutes)


module.exports = router