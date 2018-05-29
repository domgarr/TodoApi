const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = '123123';


bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

var hashedPassword = 'hashedpasswordvaluejfkldjafklas;l';

bcrypt.compare(password, hashPassword, (err, res)  => {
    console.log(res);
});

/*
var data = {
    data: 10
};

var token = jwt.sign(data, '123data');

var message = 'I am a user number 3';
var hash = SHA256(message).toString();

console.log(hash);

var data = {
    id: 4
};

var token = {
    data: data, 
    hash: SHA256(JSON.stringify(data) + 'some secret').toString()
}


var resultHash = SHA256(JSON.stringify(token.data) + 'some secret').toString();

if(resultHash === token.hash){
    console.log('trust');
}else{
    console.log("dont trust");
}
*/