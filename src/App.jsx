import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";

import "./App.css";

function App() {
   return (
      <UserProvider>
         <BrowserRouter>
            <nav>
               <ul>
                  <li>
                     <Link to="/register">Inscription</Link>
                  </li>
                  <li>
                     <Link to="/login">Connexion</Link>
                  </li>
                  <li>
                     <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                     <Link to="/change-password">Changer de mot de passe</Link>
                  </li>
               </ul>
            </nav>
            <Routes>
               <Route path="/register" element={<Register />} />
               <Route path="/login" element={<Login />} />
               <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/change-password" element={<ChangePassword />} />
               </Route>
            </Routes>
         </BrowserRouter>
      </UserProvider>
   );
}

export default App;