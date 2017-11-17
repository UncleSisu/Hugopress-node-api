module.exports = class HugoTransmitter {

  constructor (execProcess) {
    this.execProcess = execProcess;
    this.YARN_BUILD = `yarn build`;
    this.YARN_BUILD_NEW = `yarn build new`;
    this.CD_HUGO = `cd hugo-static-builder-module`;
    this.LIST_DIRECTORY = `ls -la`;
  }

  buildPage(response, instructions) {

    let command = `
      ${this.CD_HUGO}
      ${this.YARN_BUILD_NEW} page-${instructions.id}
      ${this.LIST_DIRECTORY}
      `;

    if (instructions.testing) {
      console.log(`Hugo build-page`, instructions, command);
      response.send(instructions);
    } else {
      this.executeCommand(command, response);
    }
  }

  buildHugo(response, instructions) {
    let command = `
      ${this.CD_HUGO}
      ${this.YARN_BUILD}
      ${this.LIST_DIRECTORY}
      `;

    if (instructions.testing) {
      console.log(`Hugo build generic`, instructions, command);
      response.send(instructions);
    } else {
      this.executeCommand(command, response);
    }
  }

  executeCommand(command, res) {
    this.execProcess(command , (err, stdout, stderr) => {
      console.log(`Huuuuuugo executing`, stdout);
      res.send(stdout);
    });
  }
}
