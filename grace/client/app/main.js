'use strict';

var app = angular.module('Grace', []);

app.run(function($rootScope) {
   console.log('Running');

   $rootScope.selectedRoom = '';

   $rootScope.selectRoom = function(room) {
        var room = room;

        var socket = io('http://localhost:3000');

        socket.on('connect', function() {
            // Connected, let's sign-up for to receive messages for this room
            console.log('Connected');
            socket.emit('room', room);
            socket.emit('reply', 'qué onda?');
        });

        socket.on('message', function(data) {
            console.log('Incoming message:', data);
        });
   }
    
});