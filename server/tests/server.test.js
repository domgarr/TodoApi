const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

const id = todos[2]._id;

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () =>{
    it('should create new todo', done =>{
        var text = "test todo text";
    
    request(app)
        .post('/todos')
        .set('x-auth', users[0].tokens[0].token)
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
            .set('x-auth', users[0].tokens[0].token)
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
                .set('x-auth', users[0].tokens[0].token)
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2);
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
    
    describe('GET /users/me', () => {
        it('should return user if authenticated', (done) => {
            request(app)
                .get('/users/me')
                .set("x-auth", users[0].tokens[0].token )
                .expect(200)
                .expect((res) => {
                    expect(res.body._id).toBe(users[0]._id.toHexString());
                    expect(res.body.email).toBe(users[0].email);
                })
                .end(done);
        });

        it('should return 401 if not authenticated', (done) => {
            request(app)
                .get('/users/me')
                .expect(401)
                .expect((res) => {
                    expect(Object.keys(res.body).length).toBe(0);
                    expect(res.body).toEqual({});
                })
                .end(done);
        });
    });

    describe('POST /users', () => {
        it('should create a user', (done) => {
            const validEmail = 'garreffd@uwindsor.ca';
            const validPassword = 'hello123';

            request(app)
                .post('/users')
                .send({
                    email: validEmail,
                    password: validPassword
                })
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toExist();
                    expect(res.body._id).toExist();
                    expect(res.body.email).toBe(validEmail);
                })
                .end(done);
        });

        it('should return validation error if request invalid', (done) => {

        });

        it('should not create user if email is in use', (done) => {

        });
    });

    describe('POST /users/login', () => {
        if('should login an existing user', (done) => {
            const email = 'garreffd@uwindsor.ca';
            const password = 'hello123';

            request(app)
                .post('/users/login')
                .send({email, password})
                .expect(200)
                .expect((res) => {
                    expect(res.headers['x-auth']).toExist();
                    expect(res.body.email).toBe(email);
                })
                .end(done);
        });
    });