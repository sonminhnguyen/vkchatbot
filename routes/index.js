var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn) {
    console.log('loggedin');
    res.render('index', { title: 'Express' });
  } else {
    console.log('notloggedin');
    res.redirect('/users/login');
  }
});

module.exports = router;
