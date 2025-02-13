import { useState } from "react";
import { z } from "zod";

const Register = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [message, setMessage] = useState("");

   const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
   });

   const SubmitRegister = async (e) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         setMessage("Les mots de passe ne correspondent pas");
         return;
      }

      // Validation des données avec un schéma zod
      const parsed = userSchema.safeParse({ email, password, confirmPassword });

      if (parsed.success) {
         // Envoi des données à l'API sur la route /register en POST
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
            } else {
               setMessage("Erreur lors de l'inscription");
            }
         } catch (error) {
            console.error("Error:", error);
            setMessage("Erreur lors de l'inscription");
         }
      } else {
         alert("Données invalides");
      }
   };

   return (
      <div>
         <h2>Inscription</h2>
         <form onSubmit={SubmitRegister}>
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
            <div>
               <label>Confirmation du mot de passe :</label>
               <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
               />
            </div>
            <button type="submit">S&apos;inscrire</button>
         </form>
         {message && <p>{message}</p>}
      </div>
   );
};

export default Register;
