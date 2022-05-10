var udp = require('dgram');
// var readline = require('readline');
var client = udp.createSocket('udp4');

client.on('message', function (msg, info) {
  // console.log('Data received from server : ' + msg.toString());
});

function sendCommand(command) {
  client.send(Buffer.from(command, "utf-8"), 2222, 'localhost', function (error) {
    if (error) {
      client.close();
    }
  });
}

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

process.stdin.on('data', function (data) {
  sendCommand(data.toString());
});

// function init() {
//   new Promise((resolve, reject) => {
//     rl.question('Digite uma tecla para continuar: ', (answer) => {
//       resolve(answer);
//     }
//     );
//   }).then((answer) => {
//     sendCommand(answer);
//     init();
//   }
//   );
// }
  
// init();
