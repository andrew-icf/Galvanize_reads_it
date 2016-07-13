var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('addAuthor');
});

router.post('/', function(req, res, next) {
  var data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    portrait_url: req.body.portrait_url,
    bio: req.body.bio
  };
  knex('author').insert(data).then(function(){
    console.log(data);
   res.redirect('/authors');
  }).catch(function(error){
   next(error);
 });
});

module.exports = router;
