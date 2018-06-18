require('./config');
const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile('./../client/public/index.html');
})

app.post('/todos',authenticate , (req,res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then((doc) =>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos', authenticate, (req,res) => {
    Todo.find({ _creator: req.user._id })
    .then((todos) =>{
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
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

app.delete('/todos/:id', authenticate, (req,res) => {
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        res.status(401).send();
        return;
    }

    Todo.findByIdAndRemove( id , () => {
        res.status(200).send();
    }).catch((err) => {
        res.status(400).send();
        console.log(id);
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

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        user.generateAuthToken().then((token) => {
            res.status(200).header('x-auth', token).send(user);
        })
        
    }).catch((e) => {
        res.status(401).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

    /*  How i did it.
    if(body.email != null && body.password != null) {
        User.findOne({email: body.email}).then((user) =>{
            if(!user){
                res.status(401).send({});
                return;
            }

                   bcrypt.compare(body.password, user.password, (err, _res) => {
                    console.log(_res);   
                    if(_res){
                            user.generateAuthToken().then((token) => {
                            res.status(200).header('x-auth', token).send({email: user.email});
                            });
                        }
                   });
        });
    }else{
        res.status(401).send({});
    }

    */

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