
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');
const Todo = require('../models/todo');
let mongoServer;
let server;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
    server = app.listen(8080, () => console.log('Let\'s get ready to test'));
});

afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close();
});

describe('test todo endpoints', () => {
    test('it should create a new todo', async () => {
        const response = await request(app)
            .post('/todos')
            .send({ title: 'visit europe', description: 'plan a travel to visit europe' });
        expect(response.statusCode).toBe(200);
        expect(response.body.todo.title).toEqual('visit europe');
        expect(response.body.todo.description).toEqual('plan a travel to visit europe');
    });

    test('should return array of todos', async () => {
        const todos = [
            { title: 'visit europe', description: 'plan a travel to visit europe' },
            { title: 'take a ride on a train', description: 'plan a trip on a train' },
        ];
        jest.spyOn(Todo, 'find').mockResolvedValue(todos); // Mocking the find method
        const response = await request(app).get('/todos');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(todos);
    });

    test('It should update a todo', async () => {
        const todo = new Todo({
            title: 'visit europe',
            description: 'plan a travel to visit europe',
        });
        await todo.save();

        const response = await request(app)
            .put(`/todos/${todo._id}`)
            .send({
                title: 'visit Japan',
                description: 'plan a travel to visit Japan',
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.title).toEqual('visit Japan');
        expect(response.body.description).toEqual('plan a travel to visit Japan');
    });

    test('It should delete a todo', async () => {
        const todo = new Todo({
            title: 'visit Japan',
            description: 'plan a travel to visit Japan',
        });
        await todo.save();

        const response = await request(app).delete(`/todos/${todo._id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toEqual('Todo deleted');
    });
});