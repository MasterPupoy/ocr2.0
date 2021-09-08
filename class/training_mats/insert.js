const fs = require('fs');

const corpus = fs.readFileSync('./corpus.json', 'utf-8');
const conv = JSON.parse(corpus);

const jobTitleArray = fs.readFileSync('./jobTitle.json', 'utf-8');
const jtArray = JSON.parse(jobTitleArray)

const jobSkillArray = fs.readFileSync('./jobSkill.json');
const jsArray = JSON.parse(jobSkillArray);

const educationArray = fs.readFileSync('./education.json');
const edArray = JSON.parse(educationArray);

for (let i = 0; i < jsArray.length; i++){
  conv.entities.skill.options[jsArray[i]] = [ jsArray[i].toLowerCase() ]
}

for (let i = 0; i < jtArray.length; i++){
  conv.entities.job.options[jtArray[i]] = [ jtArray[i].toLowerCase() ]
}

for (let i = 0; i < edArray.length; i++){
  conv.entities.education.options[edArray[i]] = [ edArray[i].toLowerCase() ]
}

console.log(conv);

fs.writeFileSync('./corpusModified', JSON.stringify(conv), 'utf-8')