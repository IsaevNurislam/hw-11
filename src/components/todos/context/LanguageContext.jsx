import { createContext, useContext, useEffect, useReducer } from "react";

const languageContext = createContext();

const languageReducer = (state, action) => {
  switch (action.type) {
    case "SWITCH_LANGUAGE":
      return action.payload;
    default:
      return state;
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, dispatch] = useReducer(languageReducer, "en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      dispatch({ type: "SWITCH_LANGUAGE", payload: savedLanguage });
    }
  }, []);

  const text = {
    en: {
      title: "Todo App",
      buttonText: "Submit",
      placeholderText: "Enter new todo",
      bgColor: "Dark mode",
    },
    ru: {
      title: "Приложение Todo",
      buttonText: "Представить на рассмотрение",
      placeholderText: "Введите новую задачу",
      bgColor: "Темный режим",
    },
  };

  const currentLang = text[language];

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <languageContext.Provider value={{ currentLang, dispatch }}>
      {children}
    </languageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(languageContext);
  if (!context) {
    console.error("Error: Language context not found.");
    return;
  }
  return context;
};
