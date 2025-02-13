import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Création du UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   const login = (userData) => {
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem("user");
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
