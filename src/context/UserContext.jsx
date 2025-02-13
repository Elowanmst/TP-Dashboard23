import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getToken, setToken, removeToken } from "../utils/auth";

// Création du UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
         setUser(JSON.parse(storedUser));
      }
   }, []);

   const login = (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setToken(userData.token);
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
      removeToken();
   };

   return (
      <UserContext.Provider value={{ user, login, logout }}>
         {children}
      </UserContext.Provider>
   );
};

UserProvider.propTypes = {
   children: PropTypes.node.isRequired,
};