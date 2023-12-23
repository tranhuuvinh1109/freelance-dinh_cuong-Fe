import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const APP_CONTEXT = createContext({});

// eslint-disable-next-line react/prop-types
const AppContext = ({ children }) => {
  const [user, setUser] = useState();
  return <APP_CONTEXT.Provider value={{ user, setUser }}>{children}</APP_CONTEXT.Provider>;
};

export default AppContext;
