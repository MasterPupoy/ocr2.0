const fs = require('fs');

const corpus = fs.readFileSync('./corpus.json', 'utf-8');
const conv = JSON.parse(corpus);

const jobTitleArray = fs.readFileSync('./jobTitle.json', 'utf-8');
const jtArray = JSON.parse(jobTitleArray)

const jobSkillArray = fs.readFileSync('./jobSkill.json');
const jsArray = JSON.parse(jobSkillArray);

const educationArray = fs.readFileSync('./listOfSchools.json');
const edArray = JSON.parse(educationArray);

const barangaysArray = fs.readFileSync('./location_barangays.json');
const locBarArray = JSON.parse(barangaysArray);

const municipalitiesArray = fs.readFileSync('./location_city_municipality.json');
const locMuniArray = JSON.parse(municipalitiesArray);

const provincesArray = fs.readFileSync('./location_provinces.json');
const locProvArray = JSON.parse(provincesArray);

const softSkillsArray = fs.readFileSync('./soft_skills.json');
const ssArray = JSON.parse(softSkillsArray);

const namesArray = fs.readFileSync('./names.json');
const nArray = JSON.parse(namesArray);


for (let i = 0; i < jsArray.length; i++){
  conv.entities.skill.options[jsArray[i]] = [ jsArray[i].toLowerCase() ]
}

for (let i = 0; i < jtArray.length; i++){
  conv.entities.job.options[jtArray[i]] = [ jtArray[i].toLowerCase() ]
}

for (let i = 0; i < locBarArray.length; i++){
  conv.entities.barangays.options[locBarArray[i]] = [ locBarArray[i].toLowerCase() ]
}

for (let i = 0; i < locMuniArray.length; i++){
  conv.entities.municipalities.options[locMuniArray[i]] = [ locMuniArray[i].toLowerCase() ]
}

for (let i = 0; i < locProvArray.length; i++){
  conv.entities.provinces.options[locProvArray[i]] = [ locProvArray[i].toLowerCase() ]
}

for (let i = 0; i < ssArray.length; i++){
  conv.entities.soft_skills.options[ssArray[i]] = [ ssArray[i].toLowerCase() ]
}

for (let i = 0; i < nArray.length; i++){
  conv.entities.education.options[nArray[i]] = [ nArray[i].toLowerCase() ]
}

for (let i = 0; i < edArray.length; i++){
  conv.entities.education.options[edArray[i]] = [ edArray[i].toLowerCase() ]
}


console.log(conv);

fs.writeFileSync('./corpusModified', JSON.stringify(conv), 'utf-8')