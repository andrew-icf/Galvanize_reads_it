var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('add');
});

router.post('/', function(req, res, next) {
  var data = {
    title: req.body.title,
    genre: req.body.genre,
    cover_url: req.body.cover_url,
    description: req.body.description
  };
  knex('book').insert(data).then(function(message){
   res.redirect('/books');
  }).catch(function(error){
   next(error);
  })
});

module.exports = router;
