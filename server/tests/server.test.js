const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const id = new ObjectID(123);

const todos = [{
    text: "Apply to one job"
},
{
    text: "Apply to one more job"
},
,
{
    _id: id ,
    text: "Apply to one or more jobs"
}
];

beforeEach((done) =>{
    Todo.remove({}).then(() => {
        //Returning here allows to chain callbacks.
    return Todo.insertMany(todos);
}).then(() => done());
});

describe('POST /todos', () =>{
    it('should create new todo', done =>{
        var text = "test todo text";
    
    request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
            if(err){
               return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo with invalid body data', (done)=>{
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos).toBeA('array');
                    expect(todos.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            });
    });
});


    describe('GET /todos', () => {
        it('should get all todos', (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(3);
                    expect(res.body.todos).toBeA('array');
                })
                .end(done);
        });
    });

    describe('Get /todos/:id', () => {
        it('should return a single todo', (done) => {
            request(app)
                .get('/todos/' + id)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todo).toBeA('object');
                })
                .end(done);
        });

        it('should return 404 if objectID is not valid', (done) => {
            request(app)
                .get('/todos/1234')
                .expect(404)
                .expect((res) => {
                    expect(res.body).toBeA('object');
                    //An empty object.
                    expect(Object.keys(res.body).length).toBe(0);
                })
                .end(done);
        })
    });
    