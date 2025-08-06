// src/components/Dashboard_User/Dashboard_Users.jsx

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storeAuth from "../context/storeAuth";
import { FaUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ModalTreatments from "../components/treatments/Modal";

import GaleriaImagenes from "../components/Dashboard_User/GaleriaImagenes";
import SwipeCards from "../components/Dashboard_User/SwipeCards";

import EventosPublicados from "../components/Dashboard_User/EventosPublicados";
import BotonNotificaciones from "../components/Dashboard_User/BotonNotificaciones";
import ChatConversacion from "../components/Dashboard_User/ChatConversacion";
import ModalPayment from "../components/treatments/ModalPayment";

import useEventosAdmin from "../hooks/useEventosAdmin";
import usePerfilUsuarioAutenticado from "../hooks/usePerfilUsuarioAutenticado";
import useMatches from "../hooks/useMatches";
import useNotificaciones from "../hooks/useNotificaciones";
import useChat from "../hooks/useChat";
import useAsistenciaEvento from "../hooks/useAsistenciaEvento";
import useSeguirUsuario from "../hooks/useSeguirUsuario";

const Dashboard_Users = () => {
  const navigate = useNavigate();
  const { perfil: profile, loadingPerfil } = usePerfilUsuarioAutenticado();
  const { matches, loading: loadingMatches } = useMatches();
  const usuarios = matches;

  const { eventos, loading: loadingEventos } = useEventosAdmin();
  const { solicitudes, loading: loadingSolicitudes } = useNotificaciones();
  const { confirmarAsistencia, rechazarAsistencia, cargando: cargandoAsistencia } = useAsistenciaEvento();
  const { abrirChat } = useChat();
  const { seguirUsuario, cargando: cargandoSeguir } = useSeguirUsuario();

  const [imagenesGaleria, setImagenesGaleria] = useState([]);
  const [amigoSeleccionado, setAmigoSeleccionado] = useState(null);
  const [mostrarModalTratamiento, setMostrarModalTratamiento] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);
  const [mostrarModalAporte, setMostrarModalAporte] = useState(false);
  const [aporteSeleccionado, setAporteSeleccionado] = useState(null);
  
  // Nuevo estado para la caché de chatIds
  const [chatIdsCache, setChatIdsCache] = useState({});

  useEffect(() => {
    console.log("Estado de chatInfo actualizado:", chatInfo);
  }, [chatInfo]);

  const handleAgregarImagenes = useCallback((e) => {
    const archivos = Array.from(e.target.files);
    const nuevasUrls = archivos.map((file) => URL.createObjectURL(file));
    setImagenesGaleria((prev) => [...prev, ...nuevasUrls]);
  }, []);

  const handleLogout = useCallback(() => {
    storeAuth.getState().logout();
    window.location.href = "/login";
  }, []);

  const handleAbrirChat = useCallback(
    async (match) => {
      if (!profile?._id) return;

      console.log("Clic en match:", match._id);

      // --- Lógica de la corrección ---
      const sortedIds = [profile._id, match._id].sort().join('-');
      let chatIdFromCache = chatIdsCache[sortedIds];
      
      let chatIdToUse = chatIdFromCache;

      if (!chatIdFromCache) {
        // Si no hay chatId en caché, hacemos la llamada al backend
        console.log("ChatId no encontrado en caché. Llamando al backend...");
        const respuestaChat = await abrirChat(match._id);
        if (respuestaChat && respuestaChat.chatId) {
          chatIdToUse = respuestaChat.chatId;
          setChatIdsCache(prev => ({ ...prev, [sortedIds]: chatIdToUse }));
        } else {
          console.error("Error al abrir el chat: La respuesta de la API no contiene un chatId válido.");
          return;
        }
      } else {
        console.log("ChatId encontrado en caché:", chatIdToUse);
      }
      // --- Fin de la corrección ---

      setChatInfo(prevChatInfo => {
        if (prevChatInfo?.chatId === chatIdToUse) {
          console.log("ChatId es el mismo, no se actualiza el estado.");
          return prevChatInfo;
        }
        const nuevoChatInfo = {
          chatId: chatIdToUse,
          nombre: match.nombre,
          imagenPerfil: match.imagenPerfil,
        };
        console.log("Nuevo chatId detectado, actualizando estado:", nuevoChatInfo.chatId);
        return nuevoChatInfo;
      });
    },
    [abrirChat, chatIdsCache, profile]
  );

  const handleCerrarChat = useCallback(() => {
    setChatInfo(null);
  }, []);

  const handleOpenAporteModal = useCallback((monto, concepto, descripcion) => {
    setAporteSeleccionado({ monto, concepto, descripcion });
    setMostrarModalAporte(true);
  }, []);

  const handleAporteSuccess = useCallback(() => {
    console.log("¡Aporte realizado con éxito!");
    setMostrarModalAporte(false);
    setAporteSeleccionado(null);
  }, []);

  const matchesMutuos = useMemo(() => {
    if (!profile?.seguidores || !profile?.siguiendo || !matches) {
      return [];
    }
    const misSeguidores = new Set(profile.seguidores);
    const miListaDeSeguidos = new Set(profile.siguiendo);

    return matches.filter((match) => {
      return misSeguidores.has(match._id) && miListaDeSeguidos.has(match._id);
    });
  }, [matches, profile]);

  if (loadingPerfil) return <div>Cargando perfil...</div>;
  if (!profile) return <div>No se encontró el perfil</div>;

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-[300px] xl:w-[400px] bg-white p-4 overflow-y-auto shadow">
          <header>
            <h1 className="text-xl font-bold text-blue-600">Amikuna</h1>
          </header>
          <>
            <img src={profile.imagenPerfil || "https://placehold.co/150x150"} alt="Tu foto de perfil" className="rounded-full w-32 h-32 object-cover mx-auto mb-4" />
            <h3 className="text-lg font-bold text-center">{profile.nombre}</h3>
            <p><strong>Biografía:</strong> {profile.biografia || "No definida"}</p>
            <p><strong>Intereses:</strong> {profile.intereses?.join(", ") || "No definidos"}</p>
            <p><strong>Género:</strong> {profile.genero || "No definido"}</p>
            <p><strong>Orientación:</strong> {profile.orientacion || "No definida"}</p>
            <p><strong>Fecha de nacimiento:</strong> {profile.fechaNacimiento ? profile.fechaNacimiento.split("T")[0] : "No definida"}</p>
            <GaleriaImagenes imagenes={imagenesGaleria} onAgregarImagenes={handleAgregarImagenes} />
            <hr className="my-4" />
          </>
        </aside>

        <main className="flex flex-col flex-1 min-w-0 p-4 gap-4 overflow-y-auto max-w-full md:max-w-3xl mx-auto">
          <div className="flex justify-start items-center gap-4 mb-2">
            <button onClick={() => navigate("/user/completar-perfil")} title="Editar perfil">
              <FaUser className="text-gray-600 hover:text-blue-600" size={20} />
            </button>
            <BotonNotificaciones
              solicitudes={solicitudes}
              loading={loadingSolicitudes}
              onFollow={seguirUsuario}
            />
            <button onClick={() => setMostrarModalTratamiento(true)} title="Soporte">💬</button>
            <button onClick={handleLogout} title="Cerrar sesión">
              <FiLogOut className="text-gray-600 hover:text-red-600" size={20} />
            </button>
            <button onClick={() => handleOpenAporteModal(10, "Apoyo a la app", "Contribución para mejoras de la plataforma")} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              Realizar Aporte
            </button>
          </div>
          
          {loadingMatches ? (
            <p>Cargando usuarios para swipes...</p>
          ) : (
            <SwipeCards usuarios={usuarios} onFollow={seguirUsuario} cargandoSeguir={cargandoSeguir} />
          )}
        </main>

        <aside className="hidden lg:block w-[400px] bg-white p-4 overflow-y-auto shadow">
          <EventosPublicados
            eventos={eventos}
            loading={loadingEventos}
            onConfirmar={confirmarAsistencia}
            onRechazar={rechazarAsistencia}
            cargandoAsistencia={cargandoAsistencia}
          />
          <h2 className="text-gray-500 text-sm uppercase mb-2 mt-4">Contactos</h2>
          <ul>
            {Array.isArray(matchesMutuos) && matchesMutuos.length > 0 ? (
              matchesMutuos.map((match) => (
                <li
                  key={match._id}
                  onClick={() => handleAbrirChat(match)}
                  className="cursor-pointer flex items-center gap-3 mb-3 hover:bg-gray-100 p-2 rounded"
                >
                  <img
                    src={match.imagenPerfil || "https://placehold.co/40x40"}
                    alt={match.nombre}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{match.nombre}</span>
                </li>
              ))
            ) : (
              <li>No hay matches mutuos.</li>
            )}
          </ul>
        </aside>
      </div>

      {amigoSeleccionado && (
        <div className="fixed right-0 top-0 w-80 h-full bg-white shadow-lg z-50 p-4 overflow-y-auto">
          <button onClick={() => setAmigoSeleccionado(null)} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold">×</button>
          <h2 className="text-xl font-semibold mb-4 text-center">Info del amigo</h2>
          <div className="text-center">
            <img src={amigoSeleccionado.imagenPerfil || "https://placehold.co/150x150"} alt={amigoSeleccionado.nombre} className="rounded-full w-32 h-32 object-cover mx-auto mb-4" />
            <h3 className="text-lg font-bold">{amigoSeleccionado.nombre}</h3>
            <p>Ciudad: {amigoSeleccionado.ubicacion?.ciudad || "No definida"}</p>
            <p>Intereses: {amigoSeleccionado.intereses?.join(", ") || "No definidos"}</p>
          </div>
        </div>
      )}

      {chatInfo && profile?._id && (
        <ChatConversacion
          chatInfo={chatInfo}
          miId={profile._id}
          onCloseChat={handleCerrarChat}
        />
      )}

      {mostrarModalTratamiento && (
        <ModalTreatments
          patientID={profile._id}
          onClose={() => setMostrarModalTratamiento(false)}
        />
      )}

      {mostrarModalAporte && aporteSeleccionado && (
        <ModalPayment
          aporte={aporteSeleccionado}
          onClose={() => setMostrarModalAporte(false)}
          onPaymentSuccess={handleAporteSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard_Users;