var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos', (req,res) => {
    Todo.find().then((todos) =>{
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req,res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(404).send();
        return;
    }
    Todo.findById(id).then((todo) => {
        console.log(!todo);
        if(todo == null){
            res.status(404).send();
            return;
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
    console.log("started on port 3000");
});


module.exports = {app};


/*
var newUser = new User({email: "garreffd@uwindsor.ca"});

newUser.save().then((doc) =>{
    console.log(doc);
}, (e) => {
    console.log(e);
});

var newTodo = new Todo({
    text: 'Cook dinner'
});

newTodo.save().then((doc)=>{
    console.log(doc);
}, (e) => {
    console.log("Unable to save");
});


var otherTodo = new Todo({
    text: 'Cook dinners',
    completed : true,
    completedAt: 1234
});

otherTodo.save().then((doc)=>{
    console.log(doc);
}, (e) => {
    console.log("Unable to save");
})

*/