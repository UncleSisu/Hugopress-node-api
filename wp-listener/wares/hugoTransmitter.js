const request = require('request');

module.exports = class HugoTransmitter {

  constructor (uri) {
    this.uri = uri;
  }

  postToHugo(response, payload, endpoint) {

    request(
      { uri: `${this.uri}${endpoint}`,
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
