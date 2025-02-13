import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UserContext } from "../context/UserContext";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const { login } = useContext(UserContext);
   const navigate = useNavigate();

   const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
   });

   const SubmitLogin = async (e) => {
      e.preventDefault();

      // Validation des données avec un schéma zod
      const parsed = userSchema.safeParse({ email, password });

      if (parsed.success) {
         try {
            const response = await fetch("http://localhost:3000/login", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
               const data = await response.json();
               login(data.token);
               navigate("/dashboard");
            } else {
               setMessage("Erreur lors de la connexion");
            }
         } catch (error) {
            console.error("Error:", error);
            setMessage("Erreur lors de la connexion");
         }
      } else {
         alert("Données invalides");
      }
   };

   return (
      <div>
         <h2>Connexion</h2>
         <form onSubmit={SubmitLogin}>
            <div>
               <label>Email:</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>Mot de passe:</label>
               <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
               />
            </div>
            <button type="submit">Se connecter</button>
         </form>
         {message && <p>{message}</p>}
      </div>
   );
};

export default Login;
