const { MongoClient } = require('mongodb');

const nlp = require('../class/nlp');
const NLP = new nlp();


module.exports.pdfParser = async (req) => {

  if(!req.file) {
    return {
      error : 'No file to process'
    }
  }

  const filePath = req.file.path;

  // upload to aws
  // const uploadedPath = await upload

  let parsed = await NLP.processPDF(filePath).then(result => result);

  return parsed;
  
}