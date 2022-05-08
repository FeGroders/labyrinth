var udp = require('dgram');

// creating a client socket
var client = udp.createSocket('udp4');

client.on('message', function (msg, info) {
  console.log('Data received from server : ' + msg.toString());
});

function sendCommand(command) {
  // var data = Buffer.from(command);
  // client.send(data, 2222, 'localhost', function (error) {
  client.send(Buffer.from(command), 2222, 'localhost', function (error) {
    if (error) {
      client.close();
    }
  });
}

process.stdin.on('data', function (data) {
  console.log('vc apertou: ' + data);
  sendCommand(data);
});