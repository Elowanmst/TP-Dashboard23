import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const Dashboard = () => {
   const { user, logout } = useContext(UserContext);
   const [data, setData] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      const fetchData = async () => {
         try {
            const token = getToken();
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
               console.error("Erreur de récupération des données");
            }
         } catch (error) {
            console.error("Error:", error);
         }
      };

      if (user) {
         fetchData();
      } else {
         navigate("/login");
      }
   }, [user, navigate]);

   const SubmitLogout = () => {
      logout();
      navigate("/login");
   };

   return (
      <div>
         <h2>Dashboard</h2>
         {data ? (
            <div>
               <p>Bienvenue, {user.email}!</p>
               <button onClick={SubmitLogout}>Déconnexion</button>
            </div>
         ) : (
            <p>Chargement...</p>
         )}
      </div>
   );
};

export default Dashboard;