import { create } from "zustand";

const storeAuth = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  setUser: (userData) => {
    // userData debe contener token dentro, si no hay token se rompe aquí
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token); 
    set({ user: userData, token: userData.token });
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default storeAuth;
