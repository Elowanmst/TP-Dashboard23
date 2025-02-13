import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
         });

         if (response.ok) {
            setMessage("Inscription réussie");
            navigate("/login");
         } else {
            const errorData = await response.json();
            setMessage(errorData.message || "Erreur d'inscription");
         }
      } catch (error) {
         console.error("Error:", error);
         setMessage("Erreur d'inscription");
      }
   };

   return (
      <form onSubmit={handleSubmit}>
         <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
         />
         <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
         />
         <button type="submit">Inscription</button>
         {message && <p>{message}</p>}
      </form>
   );
};

export default Register;