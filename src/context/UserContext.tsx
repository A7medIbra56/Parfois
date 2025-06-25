import React, { createContext, useState, ReactNode, useEffect } from 'react';

// Define the context type
type UserContextType = {
  userLogin: any;
  counteCart:number;
  setCounteCart: React.Dispatch<React.SetStateAction<number>>;
  setuserLogin: React.Dispatch<React.SetStateAction<null>>;
};

// Create context with proper typing and initial value
export let UserContext = createContext<UserContextType | null>(null);

// Define props for the provider component
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userLogin, setuserLogin] = useState<any>(null);
  const [counteCart, setCounteCart] = useState<number>(
  Number(localStorage.getItem("NumberCart") ?? 0)
);

  useEffect(() => {
    if (setuserLogin) {
      setuserLogin(localStorage.getItem("userToken"))
    }
  }, [setuserLogin]);

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin , counteCart , setCounteCart }}>
      {children}
    </UserContext.Provider>
  );
};
