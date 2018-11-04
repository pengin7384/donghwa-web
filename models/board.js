/**
 * Created by ss on 2017-07-11.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    contents: String,
    star: String,
    author: String,
    good : Number,
    bad : Number,
    comment_date: {type: Date, default: Date.now()}
});

var boardSchema = new Schema({
    title: String,
    contents: String,
    contents2: String,
    author: String,
    board_date: {type: Date, default: Date.now()},
    comments: [commentSchema],
    number: Number,
    total: Number
});

module.exports = mongoose.model('board', boardSchema);