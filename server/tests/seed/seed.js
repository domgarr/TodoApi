const {ObjectID} = require("mongodb");
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'garreffd@uwindsor.ca',
    password: 'userOnePass',
    tokens : [{ 
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
        }
    ]
},
{
    _id: userTwoId,
    email: "wowomg123@email.com",
    password: 'userTwoPass'
}];

const id = new ObjectID();

const todos = [{
    text: "Apply to one job",
    _creator: userOneId
},
{
    text: "Apply to one more job",
    _creator: userOneId
}
,
{
    _id: id ,
    text: "Apply to one or more jobs",
    _creator: userTwoId
}
];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        //Returning here allows to chain callbacks.
    return Todo.insertMany(todos);
}).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]).then(() => {
                done();
        });
    });
};

module.exports = {todos, populateTodos, users, populateUsers};