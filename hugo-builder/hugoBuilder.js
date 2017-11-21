const fs = require('fs');
const AbstractExecuter = require('./abstractExecuter');

module.exports = class HugoBuilder extends AbstractExecuter {
  constructor (exec) {
    super(exec);
  }

  pageBuilder(mdInfo, instructions, res) {
    const page = instructions.content.post_name;
    const targetDir = `${__dirname}/src/markup/content`;
    const targetFile = `${targetDir}/${page}`;
    const that = this;

    try {
      // fs.lstatSync(targetDir).isDirectory()
      fs.lstatSync(targetFile).isFile()
    } catch(e) {
      //do something else
      // Handle error
      if(e.code == 'ENOENT'){
        //no such file or directory
        // fs.mkdirSync(targetDir);

        fs.writeFile(
          targetFile,
          mdInfo.markdown,
          (err) => {
            if (err) throw err;
            console.log('markdown written');
            that.executeCommand(`cat ${targetFile}`);
            that.executeCommand(`ls -la ${targetDir}`);
          }
        );
      }
    }
    res.send('markdown');
  }
}
