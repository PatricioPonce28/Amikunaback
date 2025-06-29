import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token || ''}`,
      'Content-Type': 'application/json',
    },
  };
};

const storeProfile = create((set) => ({
  user: null,
  clearUser: () => set({ user: null }),

  profile: async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}perfil`;
      const respuesta = await axios.get(url, getAuthHeaders());
      set({ user: respuesta.data.perfil });
    } catch (error) {
      console.error(error);
    }
  },

  updateProfile: async (data, id) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}perfil/${id}`;
      const respuesta = await axios.put(url, data, getAuthHeaders());
      set({ user: respuesta.data.perfil });
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error al actualizar perfil");
    }
  },

  updatePasswordProfile: async (data, id) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}perfil/actualizarpassword/${id}`;
      const respuesta = await axios.put(url, data, getAuthHeaders());
      toast.success(respuesta?.data?.msg);
      return respuesta;
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Error al actualizar contraseña");
    }
  },
}));

export default storeProfile;
