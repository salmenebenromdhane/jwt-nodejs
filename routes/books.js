var express = require('express');
var router = express.Router();
var bookController=require('../Controllers/BookController')
/* GET users listing. */
router.post('/',bookController.ensureToken,bookController.addBook);
router.get('/',bookController.ensureToken,bookController.allBooks);
module.exports = router;
