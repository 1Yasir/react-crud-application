import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Checkbox, FormControlLabel, Typography, List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction, IconButton, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoApp() {
    const initialTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const [todos, setTodos] = useState(initialTodos);
    const [editId, setEditId] = useState(null);
    const [newTodo, setNewTodo] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedTodoText, setEditedTodoText] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
            setNewTodo('');
        }
    };

    const handleDeleteTodo = (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleToggleComplete = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const handleEdit = (id, text) => {
        setEditId(id);
        setEditedTodoText(text);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditId(null);
        setEditDialogOpen(false);
    };

    const handleSaveEdit = () => {
        const updatedTodos = todos.map(todo =>
            todo.id === editId ? { ...todo, text: editedTodoText } : todo
        );
        setTodos(updatedTodos);
        setEditId(null);
        setEditDialogOpen(false);
    };

    return (
        <Container maxWidth="sm" className="todo-app">
            <Typography variant="h3" component="h1" gutterBottom>
                Todo List
            </Typography>
            <TextField
                fullWidth
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter new task"
                variant="outlined"
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddTodo}
                disabled={newTodo.trim() === ''}
            >
                Add Task
            </Button>
            <List>
                {todos.map(todo => (
                    <ListItem key={todo.id} disablePadding>
                        <>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={todo.completed}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={() => handleToggleComplete(todo.id)}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={todo.text}
                                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => handleEdit(todo.id, todo.text)} edge="end">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteTodo(todo.id)} edge="end">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </>
                    </ListItem>
                ))}
            </List>

            <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit Todo</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        type="text"
                        value={editedTodoText}
                        onChange={(e) => setEditedTodoText(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Cancel</Button>
                    <Button onClick={handleSaveEdit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default TodoApp;
