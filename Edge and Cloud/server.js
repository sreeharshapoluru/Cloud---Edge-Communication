var host = "127.0.0.1", port = 33333;

var dgram = require( "dgram" );

var server = dgram.createSocket( "udp4" );
server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on( "message", function( msg, rinfo ) {
    console.log( rinfo.address + ':' + rinfo.port + ' - ' + msg );
    server.send( msg, 0, msg.length, rinfo.port, rinfo.address ); // added missing bracket
});
server.bind( port, host );
