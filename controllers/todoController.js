require('dotenv').config()
const Todo = require('../models/todo');

exports.getTodo = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.createTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.json({ todo });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSpecificTodo = async (req, res) => {
    try {
        const todoId = parseInt(req.params.id);
        const todo = await Todo.findOne({ id: todoId });
        if (!todo) {
            return res.status(404).json({ error: 'Todo item not found' });
        }
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id });
        if (!todo) {
            return res.status(404).json({ error: 'Todo item not found' });
        }
        const updates = req.body;
        Object.assign(todo, updates);
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({ _id: req.params.id });
        if (!todo) {
            return res.status(404).json({ error: 'Todo item not found' });
        }
        await todo.deleteOne();
        res.json({ message: 'Todo deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
