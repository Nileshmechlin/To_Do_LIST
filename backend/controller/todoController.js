const Todo = require('../Model/todo');

const createTodo = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    try {
        const todo = new Todo({
            title,
        });
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'To-do not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ message: 'To-do not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'To-do not found' });
        }
        res.status(200).json({ message: 'To-do deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchTodo = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";

    try {
        const count = await Todo.countDocuments({ title: { $regex: search, $options: "i" } });
        const todos = await Todo.find({ title: { $regex: search, $options: "i" } })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            todos,
            totalCount: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error in searchTodo:', error);
        res.status(500).json({ message: 'Error while searching ToDo items.', error: error.message });
    }
};

module.exports = {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    searchTodo
};
