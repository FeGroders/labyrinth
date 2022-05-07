var udp = require('dgram');
var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

sendCommand = function(command){
  client.send(command,2222,'localhost',function(error){
    if(error){
      client.close();
    }
  }
  );
}


