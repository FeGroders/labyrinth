var udp = require('dgram');
var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('siddheshrane');

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

//sending msg
client.send(data,2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});

process.stdin.on('data',function(data){
  console.log('vc apertou:' +data.toString());
}
);

process.stdin.on('end',function(){
  console.log('vc saiu');
});

process.on('keyPress',function(){
  console.log('vc clicou');
});

