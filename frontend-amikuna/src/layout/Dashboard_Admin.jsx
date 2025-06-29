import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storeAuth from '../context/storeAuth';

import UserProfile from '../components/Dashboard_Admin/UserProfile';
import EventList from '../components/Dashboard_Admin/EventList';
import Chat from '../components/Dashboard_Admin/Chat';
import UserList from '../components/Dashboard_Admin/UserList'; // Asegúrate que exista y esté bien importado

const Dashboard_Admin = () => {
  const logout = storeAuth(state => state.logout);
  const user = storeAuth(state => state.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perfil');

  const handleLogout = () => {
    logout();             // Limpia token, usuario y estado
    navigate('/login');   // Redirige a login
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header con saludo y botón de logout */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administrador</h1>
        <div>
          <span className="mr-4">Hola, {user?.nombre || user?.email}</span>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Menú de Tabs */}
      <nav className="mb-6 border-b border-gray-300">
        <ul className="flex gap-6">
          {['perfil', 'eventos', 'chat', 'usuarios'].map(tab => (
            <li
              key={tab}
              className={`cursor-pointer pb-2 ${activeTab === tab ? 'border-b-4 border-blue-600 font-semibold' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </nav>

      {/* Contenido del tab seleccionado */}
      <div>
        {activeTab === 'perfil' && <UserProfile />}
        {activeTab === 'eventos' && <EventList />}
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'usuarios' && <UserList />}
      </div>
    </div>
  );
};

export default Dashboard_Admin;
