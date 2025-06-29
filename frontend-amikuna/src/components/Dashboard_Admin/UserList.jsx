// src/Dashboard_Admin/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}usuarios`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsuarios(response.data);
      } catch (error) {
        console.error('Error al obtener usuarios', error);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Lista de Usuarios</h2>
      <ul className="list-disc ml-6">
        {usuarios.map(user => (
          <li key={user._id}>
            {user.nombre} - {user.email} ({user.rol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
