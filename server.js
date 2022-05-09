var udp = require('dgram');
var server = udp.createSocket('udp4');
var matrix = [];
var cols = 10;
var rows = 10;
var heroX = 0; //^
var heroY = 0; //>

server.on('error', function (error) {
  console.log('Error: ' + error);
  server.close();
});

server.on('message', function (msg, info) {
  console.log('Data received from client : ' + msg.toString());
  moveHero(msg);
  console.log(msg.toString())
  // console.log('\n\n');
  printMatrix();

  server.send(msg, info.port, 'localhost', function (error) {
    if (error) {
      client.close();
    }
  });
});

server.on('listening', function () {
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port: ' + port);
  console.log('Server ip: ' + ipaddr);
  console.log('Server is IP4/IP6: ' + family);

  createMatrix(rows, cols);
  printMatrix();
});

server.on('close', function () {
  console.log('Socket is closed !');
});

server.bind(2222);

function createMatrix(rows, cols) {
  // matrix = [];
  for (var i = 0; i < rows; i++) {
    matrix[i] = [];
    for (var j = 0; j < cols; j++) {
      if (i == 0 && j == 0) {
        matrix[i][j] = 'H';
      } else {
        matrix[i][j] = getBombOrEmpty();
      }
    }
  }
  addExit(matrix);
}

function printMatrix() {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      process.stdout.write(matrix[i][j] + ' ');
    }
    process.stdout.write('\n');
  }
}

function getBombOrEmpty() {
  var bombOrEmpty = Math.floor(Math.random() * 3);
  if (bombOrEmpty == 0) {
    return '*';
  } else {
    return '0';
  }
}

function addExit(matrix) {
  var exit = Math.floor(Math.random() * matrix.length);
  var exit2 = Math.floor(Math.random() * matrix.length);
  matrix[exit][exit2] = 'E';
}

function moveHero(command) {
  console.log('type: ', typeof command.toString());
  console.log('type: ', typeof 'W');
  console.log(command.toString() == 'W');
  console.log('command: ', command.toString())
  if (command.toString() == 'W' && heroY > 0) {
    heroY++;
    matrix[1][1] = '0';
    matrix[0][1] = 'H';
  } else if (command.toUpperCase == 'S'  && heroY < rows) {
    heroY--;
    matrix[0][0] = '0';
    matrix[0][1] = 'H';
  } else if (command.toUpperCase == 'A'  && heroY > 0) {
    heroX--;
    matrix[0][0] = '0';
    matrix[0][1] = 'H';
  } else if (command.toUpperCase == 'D'  && heroY < cols) {
    heroX++;
    matrix[0][0] = '0';
    matrix[0][1] = 'H';
  }
}