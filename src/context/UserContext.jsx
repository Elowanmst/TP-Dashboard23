import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { getToken, setToken, removeToken } from "../utils/auth";

// Création du UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
   const [user, setUser] = useState(() => {
      const token = getToken();
      return token ? { token } : null;
   });

   const login = (userData) => {
      setUser(userData);
      setToken(userData.token);
   };

   const logout = () => {
      setUser(null);
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


export default UserContext;