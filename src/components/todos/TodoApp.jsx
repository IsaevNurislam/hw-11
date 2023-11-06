import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";
import styled from "styled-components";

const TodoApp = () => {
  const { currentLang, dispatch: languageDispatch } = useLanguage();
  const { theme, dispatch: theneDispatch } = useTheme();

  const handleLanguageSwitch = (language) => {
    languageDispatch({ type: "SWITCH_LANGUAGE", payload: language });
  };

  const handleThemeSwitch = () => {
    theneDispatch({ type: "SWITCH_THEME" });
  };

  return (
    <div className={`App ${theme}`}>
      <h1>{currentLang.title}</h1>
      <TodoForm />
      <Con>
        <Button onClick={() => handleLanguageSwitch("ru")}>RU</Button>
        <Button onClick={() => handleLanguageSwitch("en")}>EN</Button>
        <Button onClick={handleThemeSwitch}>{currentLang.bgColor}</Button>
      </Con>
      <TodoList />
    </div>
  );
};

export default TodoApp;

const Button = styled.button`
  margin: 0 10px;
  width: 4rem;
  height: 2rem;
  background-color: beige;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

const Con = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

