import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { UserContext } from "../context/UserContext";
import { setToken } from "../utils/auth";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const { login } = useContext(UserContext);
   const navigate = useNavigate();

   const userSchema = z.object({
      email: z.string().email({ message: "Email invalide" }),
      password: z
         .string()
         .min(8, {
            message: "Le mot de passe doit contenir au moins 8 caractères",
         }),
   });

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         userSchema.parse({ email, password });

         const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
         });

         if (response.ok) {
            const data = await response.json();
            setToken(data.token);
            login({ token: data.token, email });
            setMessage("Connexion réussie !");
            navigate("/dashboard");
         } else {
            setMessage("Erreur lors de la connexion");
         }
      } catch (error) {
         if (error instanceof z.ZodError) {
            setMessage(error.errors[0].message);
         } else {
            setMessage("Erreur lors de la connexion");
         }
      }
   };

   return (
      <div>
         <h2>Connexion</h2>
         <form onSubmit={handleSubmit}>
            <div>
               <label>Email :</label>
               <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>Mot de passe :</label>
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