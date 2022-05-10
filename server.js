var udp = require('dgram');
var server = udp.createSocket('udp4');
var matrix = [];

var cols = 10;
var rows = 10;

bomb = {
  x: 0,
  y: 0
}

hero = {
  x: 0,
  y: 0
}

server.on('error', function (error) {
  console.log('Error: ' + error);
  server.close();
});

server.on('message', function (msg, info) {
  console.log('Data received from client : ' + msg.toString());
  command = msg.toString();
  moveHero(command);
  console.log(command)
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
  for (var i = 0; i < rows; i++) {
    matrix[i] = [];
    for (var j = 0; j < cols; j++) {
      if (i == hero.x && j == hero.y) {
        matrix[hero.x][hero.y] = 'H';
      } else {
        matrix[i][j] = getBombOrEmpty();
        bomb.x = i;
        bomb.y = j;
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
  console.log('command: ', command)
  matrix[hero.y][hero.x] = '0';

  if (command == 'W' && hero.y > 0) {
    hero.y--;
  } else if (command == 'S'  && hero.y < rows) {
    hero.y++;
  } else if (command == 'A'  && hero.x > 0) {
    hero.x--;
  } else if (command == 'D'  && hero.x < cols) {
    hero.x++;
  }
  matrix[hero.y][hero.x] = 'H';
}

function isBombOrExit(matrix) {
  return matrix == '*' ? true : false;
}