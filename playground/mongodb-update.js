const {MongoClient, ObjectId} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        console.log("unable able to connect");
        return;
    }
    

    //MongoDb update operators
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectId('5b077807d479792610b2cb80')
    },
    {
        $inc:{
            age : 27
        }
    },{returnOriginal: false}
    ).then((result) =>{
        console.log(result);
    });

    db.close();
});