import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageProvider } from "./components/todos/context/LanguageContext";
import { ThemeProvider } from "./components/todos/context/ThemeContext";
import { TodoProvider } from "./components/todos/context/TodoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <LanguageProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </LanguageProvider>
  </ThemeProvider>
);
