import React, { createContext, useState, ReactNode } from 'react';

// Define the context type
type UserContextType = {
  userLogin:  any;
  setuserLogin: React.Dispatch<React.SetStateAction< null>>;
};

// Create context with proper typing and initial value
export let UserContext = createContext<UserContextType | null>(null);

// Define props for the provider component
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userLogin, setuserLogin] = useState<any>(null);

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {children}
    </UserContext.Provider>
  );
};
