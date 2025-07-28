// src/components/Dashboard_User/BotonNotificaciones.jsx

import React, { useState } from 'react';
import useSeguirUsuario from '../../hooks/useSeguirUsuario'; // Reutiliza el hook
import { FaBell } from 'react-icons/fa'; // Icono de campana

const BotonNotificaciones = ({ solicitudes, loading }) => {
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const { seguirUsuario, cargando: cargandoSeguir } = useSeguirUsuario();

    const handleAceptar = async (idSolicitante) => {
        // Al aceptar, llamas a seguirUsuario, lo que hace que tu perfil ahora lo siga
        await seguirUsuario(idSolicitante);
        // Aquí podrías recargar el perfil para que la lista de solicitudes se actualice
    };

    const handleRechazar = (idSolicitante) => {
        // Sin endpoint de rechazo, simplemente ocultamos la notificación localmente
        // Aquí podrías filtrar la solicitud del estado local para que desaparezca
        console.log(`Solicitud de ${idSolicitante} rechazada (localmente).`);
        // Opcional: Llama a un endpoint de 'bloquear' si lo tienes, o no hagas nada
    };

    if (loading) return <div>Cargando notificaciones...</div>;

    return (
        <div className="relative">
            <button onClick={() => setMostrarMenu(!mostrarMenu)} className="relative p-2 rounded-full hover:bg-gray-200">
                <FaBell size={20} />
                {solicitudes.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {solicitudes.length}
                    </span>
                )}
            </button>
            {mostrarMenu && (
                <div className="absolute left-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-10">
                    <ul className="p-2">
                        {solicitudes.length === 0 ? (
                            <li className="p-2 text-gray-500">No tienes solicitudes pendientes.</li>
                        ) : (
                            solicitudes.map(solicitudId => (
                                <li key={solicitudId} className="flex justify-between items-center p-2 border-b last:border-b-0">
                                    <span className="text-sm">Solicitud de {solicitudId.substring(0, 8)}...</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleAceptar(solicitudId)} className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Aceptar</button>
                                        <button onClick={() => handleRechazar(solicitudId)} className="bg-gray-300 text-black text-xs px-2 py-1 rounded-full">Rechazar</button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default BotonNotificaciones;