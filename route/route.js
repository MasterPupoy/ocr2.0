const router = require('express').Router();
const pdfController = require('../controller/controller');

// const { MongoClient } = require('mongodb')

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../uploads/')
  },
  filename: function (req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + path.ext)
  }
});
const upload = multer({ storage : storage });

router.post('/id/:id/resume/:name', upload.single('resume'), async (req, res) => {

  pdfController.pdfParser(req).then(response => res.send(response))
  
});

router.get('/:id', (req, res) => {

})