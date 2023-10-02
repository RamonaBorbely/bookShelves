const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

const ensureUserAuth = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next()
    }

    res.redirect('/auth/login')
}

router.get('/mybooks', ensureUserAuth, userController.getAllBookList) 
router.post('/mybooks/:id',ensureUserAuth, userController.addBookToList) 
router.delete('/mybooks/:id',ensureUserAuth, userController.removeBookFromList) 
router.delete('/mybooks', ensureUserAuth, userController.clearList) 

module.exports = router