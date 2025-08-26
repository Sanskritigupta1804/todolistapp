import React, { useState } from "react";
import { useTodos } from "../context/TodoContext";

const TodoForm: React.FC = () => {
  const [text, setText] = useState("");
  const { addTodo } = useTodos();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <div className="todo-form-bg">
      <div className="todo-form-card enhanced-card">
        <form onSubmit={handleSubmit} className="">
          <h2 className="form-title enhanced-title">Create Todo</h2>
          <div className="form-group enhanced-group">
            <input
              id="todo-title"
              className="inputFieldTitle styled-input enhanced-input"
              type="text"
              placeholder="Enter title..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <button className="addTodoButton styled-button enhanced-button" type="submit">
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
