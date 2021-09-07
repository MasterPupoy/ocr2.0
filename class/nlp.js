const { NlpManager } = require('node-nlp');
const fs = require('fs');


module.exports = class nlp {
  constructor() {
    this.manager = new NlpManager({ 
      languages : ['en'], 
      forceNER : true,
    }); 
  };

  async train(manualPath) {
    console.log(fs.existsSync('./model.nlp'))
    if(fs.existsSync('./model.nlp')){
      console.log('mounting existing model \n');
      await this.manager.load('./model.nlp');
      console.log('model mounted \n');
    }else{
      if(manualPath){
        console.log(`No model found. Training nlp with ${manualPath}`)
        await this.manager.addCorpus(manualPath);
        await this.manager.train();
        await this.manager.save();
        console.log('Training complete \n');
      }
    }
  };

  async evaluate() {

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
  }
}