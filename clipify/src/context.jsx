import useFetch from "./Hooks/useFetch";
import { getCurrentUser } from "./db/auth";

import { createContext, useEffect, useContext } from "react";

const urlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data, loading, fn: fetchUser } = useFetch(getCurrentUser);
  const isAuthenticated = data?.role === "Authenticated";
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <urlContext.Provider value={{ data, loading, fetchUser, isAuthenticated }}>
      {children}
    </urlContext.Provider>
  );
};

//Instead of always importing useContext and Context, this function minimizes it
export const urlContextState = () => {
  return useContext(urlContext);
};

export default UrlProvider;
