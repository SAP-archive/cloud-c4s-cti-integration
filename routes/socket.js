var express = require('express');

/**
 * Simple socket router which send back messages to client
 * @param server
 * @returns {{}}
 */
var router = function(server) {

    io = require('socket.io')(server);

    io.on('connection',function(socket){

        var token = socket.handshake.query.token;
        console.log('session connected - token : ' + token );

        var socketId = token;
        socket.on(socketId, function(msg){
            console.log('received new message: ' + msg);
            io.emit(token ,  msg );
        });
    });

    var routes = {};
    routes.io = function (req, res) {
               };
     return routes;
};

module.exports = router;
