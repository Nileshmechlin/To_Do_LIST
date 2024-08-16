import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Alert,
} from "react-bootstrap";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");
  const [alert, setAlert] = useState({ message: "", variant: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, [searchQuery, page]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/todo/searchtodo", {
        params: {
          search: searchQuery,
          page,
          limit: 5
        }
      });
      setTodos(response.data.todos);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setAlert({
        message: "Error fetching todos. Please try again later.",
        variant: "danger"
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on search
    fetchTodos();
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/todo/createtodo", {
        title: newTodo,
      });
      setNewTodo("");
      fetchTodos();
      setAlert({ message: "Todo added successfully!", variant: "success" });
    } catch (error) {
      console.error("Error adding todo:", error);
      setAlert({
        message: "Failed to add todo. Please try again later.",
        variant: "danger",
      });
    }
  };

  const handleEditTodo = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/todo/updatetodo/${id}`, {
        title: editText,
      });
      setEditTodo(null);
      setEditText("");
      fetchTodos();
      setAlert({ message: "Todo updated successfully!", variant: "success" });
    } catch (error) {
      console.error("Error updating todo:", error);
      setAlert({
        message: "Failed to update todo. Please try again later.",
        variant: "danger",
      });
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/todo/deletetodo/${id}`);
      fetchTodos();
      setAlert({ message: "Todo deleted successfully!", variant: "success" });
    } catch (error) {
      console.error("Error deleting todo:", error);
      setAlert({
        message: "Failed to delete todo. Please try again later.",
        variant: "danger",
      });
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
          <Form onSubmit={handleSearch} className="mb-4 d-flex">
            <Form.Control
              type="text"
              placeholder="Search todos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
            />
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Form>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id}>
                  <td>{todo.title}</td>
                  <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
                  <td>
                    {editTodo === todo._id ? (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleEditTodo(todo._id)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditTodo(null)}
                          className="ms-2"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="warning"
                          onClick={() => {
                            setEditTodo(todo._id);
                            setEditText(todo.title);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteTodo(todo._id)}
                          className="ms-2"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            <Button
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
