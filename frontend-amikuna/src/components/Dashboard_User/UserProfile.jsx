import React from "react";
import storeProfile from "../../context/storeProfile";

const UserProfile = () => {
  const user = storeProfile(state => state.user);

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Mi Perfil</h2>
      <p><strong>Nombre:</strong> {user?.nombre || "N/A"}</p>
      <p><strong>Apellido:</strong> {user?.apellido || "N/A"}</p>
      <p><strong>Email:</strong> {user?.email || "N/A"}</p>
      <p><strong>Rol:</strong> {user?.rol || "Usuario"}</p>
    </div>
  );
};

export default UserProfile;
