import React, { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import EditModal from "../../UI/EditModal";

export const TodoContext = createContext();

const initialState = {
  todos: [],
  editModalOpen: false,
  selectedTodo: null,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "OPEN_EDIT_MODAL":
      return { ...state, editModalOpen: true, selectedTodo: action.payload };
    case "CLOSE_EDIT_MODAL":
      return { ...state, editModalOpen: false, selectedTodo: null };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              text: action.payload.newText,
            };
          }
          return todo;
        }),
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.payload,
            isCompleted: false,
            id: uuidv4(),
          },
        ],
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        editModalOpen: true,
        selectedTodo: action.payload,
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      dispatch({ type: "SET_TODOS", payload: savedTodos });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const openEditModal = (todo) => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: todo });
  };

  const closeEditModal = () => {
    dispatch({ type: "CLOSE_EDIT_MODAL" });
  };

  const addTodo = (text) => {
    dispatch({ type: "ADD_TODO", payload: text });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const updateTodoHandler = (id, newText) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, newText } });
  };

  const toggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const editTodo = (id, newText) => {
    dispatch({ type: "EDIT_TODO", payload: { id, newText } });
  };

  const value = {
    todos: state.todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
    openEditModal,
    updateTodoHandler,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
      {state.editModalOpen && (
        <EditModal
          isOpen={state.editModalOpen}
          closeModal={closeEditModal}
          todo={state.selectedTodo}
        />
      )}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    console.error("Error: TodoContext not found.");
    return;
  }
  return context;
};
