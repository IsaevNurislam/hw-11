import { createContext, useContext, useEffect, useReducer } from "react";

const themeContext = createContext();

const themeReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_THEME":
      return state === "white" ? "black" : "white";

    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(themeReducer, "");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch({ type: "SWITCH_THEME", payload: savedTheme });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, dispatch }}>
      {children}
    </themeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(themeContext);
  return context;
};
