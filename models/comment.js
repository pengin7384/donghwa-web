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

module.exports = mongoose.model('comment', commentSchema);