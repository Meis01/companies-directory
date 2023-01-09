/* var express = require("express");
const { store, index, update, destroy, show } = require("../controllers/categoryController");
var router = express.Router();
//const { validationResult, body } = require('express-validator');
const { body, checkSchema, check } = require('express-validator');
const multer = require('multer')
const{storage, uploadFilter } = require('../services/uploadService')
const isAdmin = require("../middlewares/isAdmin");
const checkErrors = require('')
const mesages = require('../lang/en') */

/* const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+ext[ext.length-1])
    }
  }) */
  /* const uploadFilter=(req,file,cb)=>{
    const acceptedMimetypes = [
        'image/png',
        'image/jpg',
        'image/jpeg',
    ]
    if(acceptedMimetypes.indexOf(file.mimetype) > -1){
        cb(null, true)
    }else{
        cb(null, false)
    }
  } */
/*   const upload = multer({ storage: storage ,
fileFilter: uploadFilter('image'),
limits:{
    fileSize: 1_000_000
}}).single('icon')
//const upload = multer({dest: 'uploads/'})

let errors = ''
router.post("/",
isAdmin, */
//upload.single('icon'),// from multer t uplaod file,, i hae single file its name icon
/* function(req,res,next){
    if('file' in req){
        return next()

    }else{
        return res.send({
            success: false,
            messages:['The icon you uploaded is invalid!']
        })
    }
} */
/* function (req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            errors = err.message
        } else if (err) {
            errors = 'file is required to be an image'
        }
        return next()
    })
},
check('icon').custom((value, { req }) => {//icon I a checking it yani the name i give it 
    if (req.file) {
        return true
    }
    return false
}).withMessage(function () {
    return `The icon is invalid: ${errors?.toLocaleLowerCase() || ''}`
}),
    body('name','Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),
    body('description','Description length should be between 2 and 20').isLength({ min: 2, max: 20 }),
    store
);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router; */



var express = require("express");
const { store, index, update, destroy, show } = require("../controllers/categoryController");
var router = express.Router();
const { body, check } = require('express-validator');
const multer = require('multer');
const isAdmin = require("../middlewares/isAdmin");
const { storage, uploadFilter } = require("../services/uploadService");
const checkErrors = require("../middlewares/checkErrors");

const messages = require('../lang/en')

const upload = multer({
    storage: storage,
    fileFilter: uploadFilter('image'),
    limits: {
        fileSize: 1_000_000
    }
}).single('icon')

let uploadErrors = ''

router.post("/",
    isAdmin,
    function (req, res, next) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                uploadErrors = err.message
            } else if (err) {
                uploadErrors = 'file is required to be an image'
            }
            return next()
        })
    },
    check('icon').custom((value, { req }) => {
        if (req.file) {
            return true
        }
        return false
    }).withMessage(function () {
        return `The icon is invalid: ${uploadErrors?.toLocaleLowerCase() || ''}`
    }),
    body('name', 'Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),
    body('description', 'Description length should be between 2 and 20').isLength({ min: 2, max: 20 }),
    checkErrors,
    store
);
router.get("/", index);
router.put("/:id",
    isAdmin,
    function (req, res, next) {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                uploadErrors = err.message
            } else if (err) {
                uploadErrors = 'file is required to be an image'
            }
            return next()
        })
    },
    check('icon').custom((value, { req }) => {
        if (req.file) {
            return true
        }
        return false
    }).withMessage(function () {
        return `The icon is invalid: ${uploadErrors?.toLocaleLowerCase() || ''}`
    }),
    body('name', 'Name length should be between 2 and 20').isLength({ min: 2, max: 20 }),
    body('description', 'Description length should be between 2 and 20').isLength({ min: 2, max: 20 }),
    checkErrors,
    update);
    
router.delete("/:id",
    isAdmin,
    destroy);

router.get('/:id', show);

module.exports = router;