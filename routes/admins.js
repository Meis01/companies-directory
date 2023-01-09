/* var express = require("express");
const {store, login, index, update, destroy, show} = require("../controllers/adminController");
const checkErrors = require("../middlewares/checkErrors");
const isAdmin = require("../middlewares/isAdmin");
var router = express.Router();
const { body, checkSchema, check } = require('express-validator');
const {errors} = require('../lang/en')
// check hocam 
router.post("/register",
isAdmin,
body('name','Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),
body('email','Description length should be between 2 and 20').isLength({ min: 2, max: 20 }),
body('password','password should ae uppercase').custom((value)=>{
    return validatePassword(value)
}),
checkErrors,
store);
router.post("/login", login);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router; */

var express = require("express");
const { store, login, index, update, destroy, show } = require("../controllers/adminController");
const checkErrors = require("../middlewares/checkErrors");

var router = express.Router();
const { body } = require('express-validator');

const { messages } = require('../lang/en');
const { validatePassword } = require("../services/validationService");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isAuthorized = require("../middlewares/isAuthorized");


router.post("/register",
    isAuthenticated,
    function (req, res, next) {
        isAuthorized(req, res, next, { admin: { matchId: false } })
    },
    body('name', messages.errors.name).isLength({ min: 2, max: 20 }),
    body('email', messages.errors.email).isEmail(),
    body('password', messages.errors.password)
        .custom((value) => {
            return validatePassword(value)
        }
        ),
    checkErrors,
    store);
router.post("/login", login);
router.get("/",

    isAuthenticated,
    function (req, res, next) {
        isAuthorized(req, res, next, { admin: { matchId: false } })
    }, index);
router.put("/:id",

    isAuthenticated,
    function (req, res, next) {
        isAuthorized(req, res, next, { admin: { matchId: true } })
    }, update);
router.delete("/:id",

    isAuthenticated,
    function (req, res, next) {
        isAuthorized(req, res, next, { admin: { matchId: true } })
    },
    destroy);
router.get('/:id',
    isAuthenticated,
    function (req, res, next) {
        isAuthorized(req, res, next, { admin: { matchId: true } })
    },
 show);

module.exports = router;