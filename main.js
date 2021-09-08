const nlp = require('./class/nlp');
const manualPath = './class/training_mats/corpusModified';
const fs = require('fs');

( async () => {

  const NLP = new nlp();

  await NLP.train(manualPath);
  const result = await NLP.processPDF('./uploads/AryanResume\'.pdf').then(result => {
    
    for(let i = 0; i < result.length; i++){
      console.log(result[i].entities)
    }

    fs.writeFileSync('./class/training_mats/trialrun2', JSON.stringify(result), 'utf-8');
  });

})();