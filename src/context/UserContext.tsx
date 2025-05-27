import React, { createContext, useState, ReactNode } from 'react';



export let MyContext = createContext();

interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
let [userLogin , setUserLogin] = useState(null)

  return (
    <MyContext.Provider value={{ userLogin,setUserLogin }}>
      {children}
    </MyContext.Provider>
  );
};
