var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

/* GET users listing. */
router.get('/', function(req, res, next) {
  return Promise.all([
  knex('book').select(
    'book.id as bookId',
    'book.title',
    'book.genre',
    'book.description',
    'book.cover_url'
  ).leftJoin('book_author', 'book_id', 'book.id'),
  // .where('book.id', 'book_id').first(),
  knex('author').select(
    'author.id as authorId',
    'author.first_name',
    'author.last_name',
    'author.bio',
    'author.portrait_url'
  ).leftJoin('book_author', 'author_id', 'author.id')
  // .where('author.id', 'author_id')
  ]).then(function(data){
    console.log(data[1]);
    res.render('authors', {data: data[0], author: data[1]});
  });
});

router.get('/:id/editBook', function(req, res) {
  Promise.all([
    knex('book').where({id:req.params.id}).select().first(),
    knex('author').select()
  ])
  .then(function(data){
    res.render('editBook', {book: data[0], author: data[1]});
  });
});

router.post('/:id/editBook', function (req, res, next) {
  knex('book').where({id: req.params.id}).update(req.body).then(function () {
    res.redirect("/books");
  });
});

router.get('/:id/deleteBook', function(req, res, next) {
 knex('book').where({id: req.params.id}).select().first()
  .then(function(data) {
    res.render('deleteBook', {data: data});
  });
});

router.get('/:id/deleteBook/bye', function(req, res, next) {
  knex('book').where({id: req.params.id}).del().then(function() {
    res.redirect('/books');
  });
});

module.exports = router;
