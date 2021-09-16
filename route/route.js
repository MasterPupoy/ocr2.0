const router = require('express').Router();
const pdfController = require('../controller/controller');
// const { MongoClient } = require('mongodb')
const path = require('path');
const uniqid = require('uniqid');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'..','uploads') )
  },
  filename: function (req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + '-' + uniqid() + path.extname(file.originalname))
  }
});
const upload = multer({ storage : storage });

router.post('/save-pdf', upload.single('resume') , async (req, res) => {
  try{
    // console.log(req.file)
    pdfController.pdfParser(req).then(response => res.send(response))
    // res.json({path: req.file.path})
  }catch(e){
    console.log(e)
  }
}); 

module.exports = router;