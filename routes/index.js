var express = require('express');
//var server = require('http').Server(express);
//var io = require('socket.io')(server);

var router = express.Router();
var db = require('../dbConfig.js');
//var socket_io = require('socket.io');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
  var queryString = "select * from score where username='" + req.body.username +"'";

  // 执行select 语句的时候，rows 是一个数组
  db.query(queryString, function(err, rows){
  	if (err) {
      res.send(err);
  	}else {
      if (rows.length == 0){ 
        res.send("用户名不存在");
      }else if (rows[0].password == req.body.password) {
        //res.send(rows);  //登录成功，返回用户的全部信息

        var querys = "update score set status = 1 where username='" + req.body.username +"'";
        db.query(querys);

        res.redirect('/');
      }else {
        res.send('密码错误');
        //res.set('refresh', '5;url=http://localhost:3000');
      }
  	}
  });
  
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.post('/register', function(req, res, next) {
  // 判断用户名是否存在
  var queryString = "select * from score where username='" + req.body.username +"'";
  db.query(queryString, function(err, rows){
    if (err) {
      res.send(err);
    }else {
      if (rows.length != 0) {
        res.send("用户名已存在，注册失败");
        //res.redirect("/login");
      }
    }
  })

	queryString = "insert into score(username, password) values('" + req.body.username + "', '" + req.body.password + "')";

	db.query(queryString, function(err, rows){
		if (err) {
			res.send(err);
		}else {
			res.redirect("/login");
		}
	})
});

router.post('/rank', function(req, res, next) {
  // 判断用户名是否存在
  var queryString = "update score set score = "+ req.body.score + " where username = '" + req.body.username +"'";
  db.query(queryString, function(err, rows){
    if (err) {
      res.send(err);
    }else {
      res.send("success");
    }
	})
});

router.get('/rank', function (req, res, next) {
  db.query('select * from score order by score desc', function (err, rows) {
      console.log(rows);
      if (err) {
          res.render('rank', {title: '积分排行', datas: []});  
      } else {
          res.render('rank', {title: '积分排行', datas: rows});
      }
  })
});

router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

router.post('/logout', function(req, res, next) {
  var queryString = "update score set status = 0 where username='" + req.body.username +"'";
  db.query(queryString);
  res.redirect('/');
});

module.exports = router;
