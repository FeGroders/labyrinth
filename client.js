var udp = require('dgram');
const { exit } = require('process');
var readline = require('readline');

// creating a client socket
var client = udp.createSocket('udp4');

client.on('message', function (msg, info) {
  console.log('Data received from server : ' + msg.toString());

  if (msg.toString() == '0') {
    rl.question('Digite o próximo comando: ', function (answer) {
      sendCommand(answer);
    });
    return;
  }

  if (msg.toString() == '*') {
    console.log('Você pisou em uma bomba e perdeu :(');
  } else if (msg.toString() == 'E') {
    console.log('Você ganhou :)');
  }
  client.close();
  process.exit(0);
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