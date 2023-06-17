require('dotenv').config()
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false, },
    created_at: { type: Date, default: Date.now }
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo;