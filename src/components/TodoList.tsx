
import React from "react";
import { useTodos } from "../context/TodoContext";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { day: '2-digit', weekday: 'long', hour: '2-digit', minute: '2-digit' });
};

const TodoList: React.FC = () => {
  const { todos, toggleTodo, removeTodo } = useTodos();

  return (
    <div className="todo-grid">
      {todos.map((todo) => (
        <div className={`todo-card ${todo.completed ? " completed" : ""}`} key={todo.id}>
          <div className="todo-card-header">
            <span className="todo-id">#{todo.id.toString().slice(-4)}</span>
            <button className="todo-delete" onClick={() => removeTodo(todo.id)} title="Delete">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6L14 14M14 6L6 14" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="todo-card-content" onClick={() => toggleTodo(todo.id)}>
            <span>{todo.text}</span>
          </div>
          <div className="todo-card-footer">
            <span className="todo-time">{formatTime(todo.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
