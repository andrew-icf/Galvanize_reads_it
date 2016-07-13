var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('book').select().then(function(data){
    res.render('deleteBook');
  });
});

router.get('/:id', function(req, res, next) {
 knex('book').where({bookId: req.params.id}).select().first()
  .then(function(data) {
    res.render('deleteBook', {data: data});
  });
});




module.exports = router;
