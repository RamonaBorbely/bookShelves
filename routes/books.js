const express = require('express')
const router = express.Router()
const booksCotroller = require('../controllers/bookController')



router.get('/', booksCotroller.getAllBooks)

router.get('/:id', booksCotroller.getBook)

router.post('/', booksCotroller.postBook)
       
router.put('/:id', booksCotroller.updateBook)

router.delete('/:id', booksCotroller.deleteBook)

module.exports = router