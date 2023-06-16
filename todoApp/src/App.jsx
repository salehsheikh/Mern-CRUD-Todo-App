import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { baseURL } from "./utils/Constant";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch todos:", error);
      });
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      return;
    }

    const todo = {
      task: newTodo,
      date: dueDate,
    };

    axios
      .post(`${baseURL}/save`, todo)
      .then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
        setDueDate(null);
      })
      .catch((error) => {
        console.error("Failed to save todo:", error);
      });
  };

  const handleEditTodo = () => {
    if (editTodoText.trim() === "") {
      return;
    }

    const updatedTodo = {
      task: editTodoText,
      date: dueDate,
    };

    axios
      .put(`${baseURL}/update/${editTodoId}`, updatedTodo)
      .then(() => {
        const updatedTodos = todos.map((todo) => {
          if (todo._id === editTodoId) {
            return { ...todo, task: editTodoText, date: dueDate };
          }
          return todo;
        });

        setTodos(updatedTodos);
        setEditTodoId(null);
        setEditTodoText("");
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Failed to update todo:", error);
      });
  };

  const handleDeleteTodo = (id) => {
    axios
      .delete(`${baseURL}/delete/${id}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error("Failed to delete todo:", error);
      });
  };

  
  const handleEditButtonClick = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
    setEditMode(true);
    setNewTodo(""); // Clear the "Add task" input when edit button is clicked
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="group">
        {!editMode && ( // Show the "Add task" input only if not in edit mode
          <input
            type="text"
            placeholder="add task"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        )}
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          placeholderText="set due date"
        />
        {editMode ? (
          <>
            <input
              type="text"
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
            />
            <button onClick={handleEditTodo}>Update Todo</button>
          </>
        ) : (
          <button onClick={handleAddTodo}>Add Todo</button>
        )}
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task} - {todo.date && new Date(todo.date).toString()}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            <button onClick={() => handleEditButtonClick(todo._id, todo.task)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;