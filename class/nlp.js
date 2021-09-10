const { NlpManager } = require('node-nlp');
const fs = require('fs');
const path = require('path');

const pdf_extract = require('pdf-extract');
const options = {
  type : 'ocr',
  ocr_flags: [
    '--psm 3'
  ]
}


module.exports = class nlp {
  constructor() {
    this.manager = new NlpManager({ 
      languages : ['en'], 
      forceNER : true,
      threshold : 1
    }); 
  };

  async train(manualPath) {
    console.log(fs.existsSync('./model.nlp'))
    if(fs.existsSync('./model.nlp')){
      console.log('Mounting existing model...');
      await this.manager.load('./model.nlp');
      console.log('Model mounted successfully!');
    }else{
      if(manualPath){
        console.log(`No model found. Training nlp with ${path.basename(manualPath)}`)
        await this.manager.addCorpus(manualPath);
        await this.manager.train();
        await this.manager.save();
        console.log('Training complete! \n');
      }
    };
  };

  async interactive() {

    process.stdout.write('enter string to process: ')
    process.stdin.on('data', async (data) => {
      const res = await this.manager.process('en', data.toString().trim());
      console.log(res);
    })
  };

  async mountNER(data) {
    
    const mats =  fs.readFileSync(data, 'utf-8');
    const conv = JSON.parse(mats);
    console.log(conv);
    for(let i = 0; i < conv.length; i++){
      this.manager.addNerRuleOptionTexts('en', 'skill', data.name, data.options);
    };
  };

  async processPDF(absolutepath){

    if(!absolutepath){
      return new Error('No path was defined on processPDF');
    }

    console.log(`Processing ${path.basename(absolutepath)} . Please wait...`);

    const processor = pdf_extract(absolutepath, options, (err) => {
      if(err){
        return new Error(err);
      }
    })

    console.time('processing');
    
    let result = await new Promise((resolve, reject) => { 
      console.log('File grabbed. Parsing now... ')
      
      const manage = this.manager
      
      processor.on('complete', async function (data) {
        let pages = await data.text_pages;
        
        let text;

        if(pages.length > 0){
          text = pages.join('');
        }else{
          text = pages[0];
        }
        console.log(text);

        let replaced = text.split('\n').join(' ').split('. ');
        console.log(replaced);

        let final = Promise.all(replaced.map(async data => {
          let processed = await manage.process('en', data.toString().trim())
      
          return { 
            utterance : processed.utterance,
            sourceEntities : processed.sourceEntities,
            entities : processed.entities,
            classifications: processed.classifications
          }

        }))

        resolve(final)
      })
      
      processor.on('error', error => {
        console.log(err);
        reject(new Error(error));
      });
    })

    console.timeEnd('processing');

    // let final = Promise.all(result.map(async data => {
      
     
    //   let processed = await this.manager.process('en', data.toString().trim())
      
    //   return { 
    //     utterance : processed.utterance,
    //     sourceEntities : processed.sourceEntities,
    //     entities : processed.entities,
    //     classifications: processed.classifications
    //   }
    // })
    // )

    return result;
    
  }

}