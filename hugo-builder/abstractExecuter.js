module.exports = class Executer {
  constructor (exec) {
    this.exec = exec;
  }

  executeCommand(command) {
    this.exec(command , (err, stdout, stderr) => {
      if (err) console.log('hugo execution err', err);
      if (stderr) console.log('hugo execution stderr', stderr);
      if (stdout) console.log('hugo execution stdout', stdout);
      // if (res) res.send(stdout);
      // res.send(stdout);
    });
  }
}
