import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/auth";

const ChangePassword = () => {
   const [oldPassword, setOldPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmNewPassword, setConfirmNewPassword] = useState("");
   const [message, setMessage] = useState("");
   const navigate = useNavigate();

   const passwordSchema = z.object({
      oldPassword: z.string().min(8),
      newPassword: z.string().min(8),
      confirmNewPassword: z.string().min(8),
   });

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         passwordSchema.parse({ oldPassword, newPassword, confirmNewPassword });

         const token = getToken();
         if (!token) {
            setMessage("Utilisateur non authentifié");
            navigate("/login");
            return;
         }

         const response = await fetch("http://localhost:3000/change-password", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ oldPassword, newPassword }),
         });

         if (response.ok) {
            setMessage("Mot de passe mis à jour avec succès");
         } else {
            const errorText = await response.text();
            setMessage(
               `Erreur lors de la mise à jour du mot de passe: ${errorText}`
            );
         }
      } catch (error) {
         if (error instanceof z.ZodError) {
            setMessage(error.errors[0].message);
         } else {
            setMessage("Erreur lors de la mise à jour du mot de passe");
         }
      }
   };

   return (
      <div>
         <h2>Changer de mot de passe</h2>
         <form onSubmit={handleSubmit}>
            <div>
               <label>Ancien mot de passe :</label>
               <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>Nouveau mot de passe :</label>
               <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
               />
            </div>
            <div>
               <label>Confirmer le nouveau mot de passe :</label>
               <input
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
               />
            </div>
            <button type="submit">Changer le mot de passe</button>
         </form>
         {message && <p>{message}</p>}
      </div>
   );
};

export default ChangePassword;