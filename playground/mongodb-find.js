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

db.collection('Users').find({name: 'Domenic'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
    console.log("Unable to fetch todos", err);
});

    console.log("Connected");
    
}
);