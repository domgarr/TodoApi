require('./config');
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

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

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
  
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user.toJSON());
    })
    .catch((e) => {
        res.status(400).send(e);
        console.log('Error', e);
        return;
    });
});



app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log("started on port ${port}");
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