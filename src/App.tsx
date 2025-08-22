import React, { useState } from "react";
import "./App.css";


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setText("");
  }

  
  function toggleTodo(id: number) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }


  function deleteTodo(id: number) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="App" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Todo List</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button
          type="submit"
          style={{ padding: "8px 16px", background: "blue", color: "white", border: "none" }}
        >
          Add
        </button>
      </form>


      <ul style={{ listStyle: "none", padding: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              marginBottom: "8px",
              background: "#f0f0f0",
              borderRadius: "5px",
            }}
          >
          
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                {todo.text}
              </span>
            </div>

           
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ background: "red", color: "white", border: "none", padding: "4px 8px", cursor: "pointer" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
