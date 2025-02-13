import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { setToken } from "../utils/auth";
import { userSchema } from "../schemas/userSchema";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [message, setMessage] = useState("");
   const { login } = useContext(UserContext);
   const navigate = useNavigate();

   const SubmitLogin = async (e) => {
      e.preventDefault();

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
               const userData = await response.json();
               login(userData);
               setToken(userData.token);
               navigate("/dashboard");
            } else {
               const errorData = await response.json();
               setMessage(errorData.message || "Erreur de connexion");
            }
         } catch (error) {
            console.error("Error:", error);
            setMessage("Erreur de connexion");
         }
      } else {
         setMessage("Validation échouée");
      }
   };

   return (
      <form onSubmit={SubmitLogin}>
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
         <button type="submit">Connexion</button>
         {message && <p>{message}</p>}
      </form>
   );
};

export default Login;