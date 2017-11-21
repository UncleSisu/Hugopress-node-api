const request = require('request');

module.exports = class HugoTransmitter {

  constructor (uri) {
    this.uri = uri;
  }

  postToHugo(response, payload, cmdType) {

    request(
      { uri: `${this.uri}${cmdType}`,
        method: 'POST',
        json: true,
        body: payload
      }, this.postResponse);

    response.send('Instructions sent');
  }

  postResponse(res){
    console.log(`checkPost`, res);
  }
}
