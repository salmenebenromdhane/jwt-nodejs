var express = require('express');
var router = express.Router();
var userController=require('../Controllers/UserController')
/* GET users listing. */
router.post('/',userController.addUser);
router.get('/',userController.login);
router.get('/loginWithPassport',userController.loginWithPassport);
  

module.exports = router;
