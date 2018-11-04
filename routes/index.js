var express = require('express');
var router = express.Router();

var Board = require('../models/board');
var Comment = require('../models/comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  Board.find({}, function (err, board) {
      res.render('index', { title: 'Express', board: board });
  });
});

/* Write board page */
router.get('/write', function(req, res, next) {
    res.render('write', { title: '글쓰기' });
});



/* board insert mongo */
router.post('/board/write', function (req, res) {
  var board = new Board();
  board.title = req.body.title;
  board.contents = req.body.contents;
  board.contents2 = req.body.contents2;
  board.author = req.body.author;
  board.number = 15;
  board.total = 0;

  board.save(function (err) {
    if(err){
      console.log(err);
      res.redirect('/');
    }
    res.redirect('/');
  });
});

/* board find by id */
router.get('/board/:id', function (req, res) {
    // board.length
    //Board.update({_id: req.params.id}, { $inc: { total: 1 } });

    Board.findOneAndUpdate({_id : req.params.id}, { $inc: { total: 1 }}, function (err, board) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
    });

    Board.findOne({_id: req.params.id}, function (err, board) {
        res.render('board', { title: 'Board', board: board });
    });
});

/* comment insert mongo*/
router.post('/comment/write', function (req, res){
    var comment = new Comment();
    comment.contents = req.body.contents;
    comment.author = req.body.author;
    comment.star = req.body.star;
    comment.good = 0;
    comment.bad = 0;

    Board.findOneAndUpdate({_id : req.body.id}, { $push: { comments : comment}}, function (err, board) {
        if(err){
            console.log(err);
            res.redirect('/');
        }
        res.redirect('/board/'+req.body.id);
    });
});

module.exports = router;
