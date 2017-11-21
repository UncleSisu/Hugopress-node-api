module.exports = class Executer {
  constructor (exec) {
    this.exec = exec;
  }

  executeCommand(command, res) {
    this.exec(command , (err, stdout, stderr) => {
      console.log(`Huuuuuugo executing`, stdout);
      if (res) res.send(stdout);
    });
  }
}
