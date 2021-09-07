const nlp = require('./class/nlp');
const manualPath = './class/training_mats/corpusModified';

const NLP = new nlp();

NLP.train(manualPath);
NLP.evaluate();