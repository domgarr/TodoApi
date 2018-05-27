const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log("unable able to connect");
        return;
    }
    //Delete many
    db.collection('Todos').deleteMany({text: 'apply to one job'}).then((result) =>{
        console.log(result);
    })
    //DeleteOne
    //Deletes first item found.

    //FindOneAndDelete -> returns the document deleted.
}
);