
import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { day: '2-digit', weekday: 'long', hour: '2-digit', minute: '2-digit' });
};

const TodoList: React.FC = () => {
  const { todos, toggleTodo, removeTodo, updateTodo } = useTodos();
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const startEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditText(e.target.value);
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      updateTodo(id, editText.trim());
      setEditId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const completedCount = todos.filter(t => t.completed).length;
  return (
    <>
      <div className="todo-counts">
        <span className="todo-count">Total Todos: {todos.length}</span>
        <span className="completed-count">Completed: {completedCount}</span>
      </div>
      <div className="todo-grid">
        {todos.map((todo) => (
          <div className={`todo-card ${todo.completed ? " completed" : ""}`} key={todo.id}>
            <div className="todo-card-header">
              <span className="todo-id">#{todo.id.toString().slice(-4)}</span>
              {todo.completed && (
                <span className="completed-flag" title="Completed">🏁</span>
              )}
              <div style={{ display: "flex", gap: 6 }}>
                {!todo.completed && (
                  <button className="mark-complete-btn" onClick={() => toggleTodo(todo.id)} title="Mark as Complete" style={{marginRight: 4}}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="9" stroke="#27ae60" strokeWidth="2" fill="#eafaf1"/>
                      <path d="M6 10.5l2.5 2.5 5-5" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
                <button className="todo-edit" onClick={() => startEdit(todo.id, todo.text)} title="Edit" style={{marginRight: 4}}>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 13.5V16h2.5l7.1-7.1-2.5-2.5L4 13.5zM17.7 6.3c.4-.4.4-1 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-1.8 1.8 4 4 1.8-1.8z" fill="#299eeb"/>
                  </svg>
                </button>
                <button className="todo-delete" onClick={() => removeTodo(todo.id)} title="Delete">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L14 14M14 6L6 14" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="todo-card-content">
              {editId === todo.id ? (
                <div className="edit-todo-form">
                  <input
                    className="edit-todo-input"
                    value={editText}
                    onChange={handleEditChange}
                    autoFocus
                    onKeyDown={e => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") cancelEdit();
                    }}
                  />
                  <button className="edit-save-btn" onClick={() => saveEdit(todo.id)} title="Save">✔️</button>
                  <button className="edit-cancel-btn" onClick={cancelEdit} title="Cancel">✖️</button>
                </div>
              ) : (
                <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
              )}
            </div>
            <div className="todo-card-footer">
              <span className="todo-time">{formatTime(todo.createdAt)}</span>
              {todo.completed && (
                <button
                  className="mark-as-todo-btn"
                  onClick={() => toggleTodo(todo.id)}
                  style={{ marginLeft: 12 }}
                  title="Mark as Todo"
                >
                  Mark is not completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
