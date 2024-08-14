import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, ListGroup, Alert } from 'react-bootstrap';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editTodo, setEditTodo] = useState(null);
    const [editText, setEditText] = useState('');
    const [alert, setAlert] = useState({ message: '', variant: '' });

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/todo/gettodo');
            setTodos(response.data);
        } catch (error) {
            setAlert({ message: 'Error fetching todos. Please try again later.', variant: 'danger' });
        }
    };

    const handleAddTodo = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/todo/createtodo', { title: newTodo });
            setNewTodo('');
            fetchTodos();
            setAlert({ message: 'Todo added successfully!', variant: 'success' });
        } catch (error) {
            setAlert({ message: 'Failed to add todo. Please try again later.', variant: 'danger' });
        }
    };

    const handleEditTodo = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/todo/updatetodo/${id}`, { title: editText });
            setEditTodo(null);
            setEditText('');
            fetchTodos();
            setAlert({ message: 'Todo updated successfully!', variant: 'success' });
        } catch (error) {
            setAlert({ message: 'Failed to update todo. Please try again later.', variant: 'danger' });
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todo/deletetodo/${id}`);
            fetchTodos();
            setAlert({ message: 'Todo deleted successfully!', variant: 'success' });
        } catch (error) {
            setAlert({ message: 'Failed to delete todo. Please try again later.', variant: 'danger' });
        }
    };

    return (
        <Container className="mt-5">
            {alert.message && <Alert variant={alert.variant}>{alert.message}</Alert>}
            <Row className="mb-4">
                <Col md={6} className="mx-auto">
                    <Card className="border-primary">
                        <Card.Body>
                            <h3 className="text-center mb-4">ToDo Dashboard</h3>
                            <Form onSubmit={handleAddTodo}>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter new todo"
                                        value={newTodo}
                                        onChange={(e) => setNewTodo(e.target.value)}
                                        required
                                        className="border-secondary"
                                    />
                                </Form.Group>
                                <Button className="mt-3" variant="primary" type="submit">
                                    Add Todo
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={8} className="mx-auto">
                    <ListGroup>
                        {todos.map(todo => (
                            <ListGroup.Item
                                key={todo._id}
                                className="d-flex justify-content-between align-items-center border-info mb-2"
                            >
                                {editTodo === todo._id ? (
                                    <Form onSubmit={() => handleEditTodo(todo._id)}>
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                required
                                                className="border-secondary"
                                            />
                                        </Form.Group>
                                        <Button className="mt-2" variant="success" type="submit">
                                            Save
                                        </Button>
                                        <Button className="mt-2 ms-2" variant="secondary" onClick={() => setEditTodo(null)}>
                                            Cancel
                                        </Button>
                                    </Form>
                                ) : (
                                    <>
                                        <span>{todo.title}</span>
                                        <div>
                                            <Button
                                                variant="warning"
                                                onClick={() => { setEditTodo(todo._id); setEditText(todo.text); }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                className="ms-2"
                                                variant="danger"
                                                onClick={() => handleDeleteTodo(todo._id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
