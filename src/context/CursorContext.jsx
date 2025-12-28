import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
const CursorContext = createContext();

// 2. Create the Provider Component
export const CursorProvider = ({ children }) => {
  // This state determines how the cursor looks ('default', 'contact', etc.)
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // This state determines what text is inside the cursor
  const [cursorText, setCursorText] = useState("");

  return (
    <CursorContext.Provider 
      value={{ 
        cursorVariant, 
        setCursorVariant, 
        cursorText, 
        setCursorText 
      }}
    >
      {children}
    </CursorContext.Provider>
  );
};

// 3. Create a custom hook to use this context easily
export const useCursor = () => {
  return useContext(CursorContext);
};