// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const {createTodo,getTodos,getTodoById,updateTodo,deleteTodo, searchTodo,} = require('../controller/todoController');

router.post('/createtodo', createTodo);

router.get('/searchtodo', searchTodo);

router.get('/gettodo', getTodos);

router.get('/gettodo/:id', getTodoById);

router.put('/updatetodo/:id', updateTodo);

router.delete('/deletetodo/:id', deleteTodo);

module.exports = router;
