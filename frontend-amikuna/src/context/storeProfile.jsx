import { create } from "zustand";
import axios from "axios";
import getAuthHeaders from "../helpers/getAuthHeaders";
import { toast } from "react-toastify";

const storeProfile = create((set) => ({
  user: null,

  profile: async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}estudiantes/perfil`;
      const respuesta = await axios.get(url, getAuthHeaders());

      set({ user: respuesta.data });  // O respuesta.data.perfil según backend
      console.log("Perfil cargado:", respuesta.data);

    } catch (error) {
      console.error("Error cargando perfil:", error);
      toast.error("No se pudo cargar el perfil");
    }
  },

  updateProfile: async (formData) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}estudiantes/completarPerfil`;
      const respuesta = await axios.put(url, formData, {
        ...getAuthHeaders(),
        headers: {
          ...getAuthHeaders().headers,
          "Content-Type": "multipart/form-data",
        },
      });

      set({ user: respuesta.data.perfilActualizado });
      toast.success(respuesta.data.msg);

    } catch (error) {
      console.error("Error actualizando perfil:", error);
      toast.error("No se pudo actualizar el perfil");
    }
  }
}));

export default storeProfile;
