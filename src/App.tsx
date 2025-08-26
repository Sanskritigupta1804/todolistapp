import React from "react";
import { TodoProvider } from "./context/TodoContext";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className="app">
        <p className="app-title">Todo List App</p>
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;
