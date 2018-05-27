const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = "5b08c89efc3b5c600cc5e2f0";
var invalidID = "6b08c89efc3b5c600cc5e2f0";


/*
if(!ObjectID.isValid(id)){
    return console.log("ID not valid");
}
*/

/*
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todos', todos);
});


Todo.findById(id).then((todo) => {
    if(!todo){
         console.log("ID not found");
    }
    console.log('Todo', todo);
}).catch( (e) => console.log(e) );
*/

User.findById(invalidID).then((user) => {
    //if(!user){
  //      return console.log('User not found.');
   // }
    console.log(user);
    
}).catch((e) => console.log(e));
