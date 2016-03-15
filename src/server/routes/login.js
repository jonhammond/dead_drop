var express = require('express');
var router = express.Router();
var queries = require('../db/queries');
var passport = require('../db/lib/auth');
var helpers = require('../db/lib/helper');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'The Login Page' });
});

//route to post login and authenticate with passport when the user clicks submit on the /login page
  router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) {
        console.log('error:', err);
        return next(err);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            console.log('error:', err);
            return next(err);
          } else {
            return res.render('index', {title: 'Dead Drop'});
          }
        });
      }
    })(req, res, next);
  });

module.exports = router;