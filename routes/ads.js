var express = require("express");
const { store, index, update, destroy, show } = require("../controllers/adController");
var router = express.Router();
const { validationResult, body } = require('express-validator');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.'+ext[ext.length-1])
    }
  })
  const uploadFilter=(req,file,cb)=>{
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
  }
  const upload = multer({ storage: storage ,
fileFilter: uploadFilter})
//const upload = multer({dest: 'uploads/'})


router.post("/",
upload.single('photo'),// from multer t uplaod file,, i hae single file its name icon
function(req,res,next){
    if('file' in req){
        return next()

    }else{
        return res.send({
            success: false,
            messages:['The photo you uploaded is invalid!']
        })
    }
},  store
);
router.get("/", index);
router.put("/:id", update);
router.delete("/:id", destroy);
router.get('/:id', show);

module.exports = router;