const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.getTodo)
router.post('/', todoController.createTodo)
router.get('/:id', todoController.getSpecificTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

module.exports = router