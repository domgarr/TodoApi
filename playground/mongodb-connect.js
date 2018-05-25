const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log("unable able to connect");
        return;
    }
    /*
    db.collection('Todos').insertOne({
        text: 'apply to one job',
        completed: false
    }, (err, result) => {
        if(err){
            console.log("unable to insert");
            return;
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

*/

db.collection('Users').insertOne({
    name: 'Domenic',
    age: 26,
    location: 'Windsor, Ontario'
}, (err, result) => {
    if(err){
        return;
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
});

    console.log("Connected");
    db.close();
}
);