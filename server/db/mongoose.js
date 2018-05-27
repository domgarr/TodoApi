var mongoose = require('mongoose');

//Set up to use promises.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };