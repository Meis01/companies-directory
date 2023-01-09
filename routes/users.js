var express = require('express');
const {store,login} = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/',store);
router.post('/login',login);

module.exports = router;
