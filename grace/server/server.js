var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    // app.start();
    app.io = require('socket.io')(app.start());

    var room = "Aula 2";

    app.io.on('connection', function(socket){
      console.log('a user connected');
      
      socket.on('room', function(room){
          socket.join(room);
      });
      socket.on('reply', function(data) {
        console.log(data);
        app.io.in(room).emit('message', 'what is going on, party people?');
      })
      socket.on('disconnect', function(){
          console.log('user disconnected');
      });
    });

    
  
});
