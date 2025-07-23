import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/";

// Variable para controlar si ya mostramos un toast de error
let errorToastId = null;

function useFetch() {
  const fetchDataBackend = async (url, data = null, method = "GET", headers = {}, showToast = true) => {
    const showLoadingToast = showToast && method.toUpperCase() !== "GET";
    const loadingToast = showLoadingToast ? toast.loading("Procesando solicitud...") : null;

    try {
      const fullUrl = url.startsWith("http")
        ? url
        : `${baseUrl.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
      const token = localStorage.getItem("token");

      const isFormData = data instanceof FormData;
      const combinedHeaders = {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(!isFormData && { "Content-Type": "application/json" }),
      };

      const options = {
        method: method.toUpperCase(),
        url: fullUrl,
        headers: combinedHeaders,
        ...(method.toUpperCase() !== "GET" && data ? { data } : {}),
      };

      const response = await axios(options);

      if (loadingToast) toast.dismiss(loadingToast);
      if (response?.data?.msg && showToast && method !== "GET") toast.success(response.data.msg);

      return response.data;
    } catch (error) {
      if (loadingToast) toast.dismiss(loadingToast);

      const errorMsg =
        error?.response?.data?.msg ||
        error?.response?.data?.error ||
        error?.message ||
        "Error desconocido";

      if (errorMsg.toLowerCase().includes("token expired")) {
        localStorage.removeItem("token");
        toast.error("Sesión expirada. Por favor inicia sesión nuevamente.");
        window.location.href = "/login";
        return;
      }

      // Evitar mostrar múltiples toasts idénticos simultáneos
      if (showToast) {
        if (!errorToastId) {
          errorToastId = toast.error(errorMsg, {
            onClose: () => {
              errorToastId = null; // Resetea para permitir futuros toasts
            },
            autoClose: 3000, // Cierra solo después de 3 segundos
          });
        }
      }

      throw new Error(errorMsg);
    }
  };

  return { fetchDataBackend };
}

export default useFetch;
