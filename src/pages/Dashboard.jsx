import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const Dashboard = () => {
   const { user, logout } = useContext(UserContext);
   const [data, setData] = useState(null);
   const [error, setError] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         const token = getToken();
         if (!token) {
            navigate("/login");
            return;
         }

         try {
            const response = await fetch("http://localhost:3000/dashboard", {
               method: "GET",
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            if (response.ok) {
               const result = await response.json();
               setData(result);
            } else {
               const errorText = await response.text();
               setError(
                  `Erreur lors de la récupération des données: ${errorText}`
               );
            }
         } catch (error) {
            setError(`Erreur: ${error.message}`);
         }
      };

      fetchData();
   }, [navigate]);

   const handleLogout = () => {
      logout();
      navigate("/login");
   };

   return (
      <div>
         <h2>Dashboard</h2>
         {error && <p style={{ color: "red" }}>{error}</p>}
         {data ? (
            <div>
               <p>Bienvenue, {user.email}!</p>
               <button onClick={handleLogout}>Déconnexion</button>
            </div>
         ) : (
            !error && <p>Chargement...</p>
         )}
      </div>
   );
};
export default Dashboard;