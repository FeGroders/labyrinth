var udp = require('dgram');
var readline = require('readline');

// creating a client socket
var client = udp.createSocket('udp4');

client.on('message', function (msg, info) {
  // console.log('Data received from server : ' + msg.toString());
  rl.question('Digite o próximo comando: ', function (answer) {
    sendCommand(answer);
  });
});

function sendCommand(command) {
  client.send(Buffer.from(command, "utf-8"), 2222, 'localhost', function (error) {
    if (error) {
      client.close();
    }
  });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite o próximo comando: ', function (answer) {
  sendCommand(answer);
});