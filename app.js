var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var index = require('./routes/index');
var users = require('./routes/users');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
//app.set('view engine', 'ejs');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

var userList=[];

io.on('connection', function(socket){
  var user = '';
  console.log('a user connected');
  io.emit('sys', userList);  

  socket.on("transname", function(name){
    user = name;
    userList.push(name);
    io.emit('sys', userList);  
    //console.log('userlist ' + userList);
  });
  
  socket.on('userlist', function(userList){
    io.emit('userlist', userList);
    //console.log('show list!');
  });

  socket.on('notconnect', function(username){
    Array.prototype.indexOf = function(val) { 
      for (var i = 0; i < this.length; i++) { 
      if (this[i] == val) return i; 
      } 
      return -1; 
      };
      Array.prototype.remove = function(val) { 
        var index = this.indexOf(val); 
        if (index > -1) { 
        this.splice(index, 1); 
        } 
      };
      userList.remove(username);
    //console.log('userlist ' + userList);
    //console.log('remove'+username);
  });

  socket.on('disconnect', function(){
    Array.prototype.indexOf = function(val) { 
      for (var i = 0; i < this.length; i++) { 
      if (this[i] == val) return i; 
      } 
      return -1; 
      };
      Array.prototype.remove = function(val) { 
        var index = this.indexOf(val); 
        if (index > -1) { 
        this.splice(index, 1); 
        } 
      };
      userList.remove(user);
      io.emit('sys', userList);  
      //console.log('remove'+user);
      //console.log('user disconnected');
  });

});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
  console.log('start at port:' + server.address().port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
