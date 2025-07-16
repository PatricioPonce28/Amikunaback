import axios from "axios";
import { toast } from "react-toastify";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000/api/";

function useFetch() {
  const fetchDataBackend = async (url, data = null, method = "GET", headers = {}, showToast = true) => {
    // Mostrar toast de carga solo si es POST/PUT/DELETE, no en GET
    const showLoadingToast = showToast && method.toUpperCase() !== "GET";
    const loadingToast = showLoadingToast ? toast.loading("Procesando solicitud...") : null;

    try {
      const fullUrl = url.startsWith("http") ? url : baseUrl + url;
      const token = localStorage.getItem("token");

      const isFormData = data instanceof FormData;
      const combinedHeaders = {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      if (!isFormData) {
        combinedHeaders["Content-Type"] = "application/json";
      }

      const options = {
        method: method.toUpperCase(),
        url: fullUrl,
        headers: combinedHeaders,
      };

      if (options.method !== "GET") {
        options.data = data;
      }

      const response = await axios(options);

      if (loadingToast) toast.dismiss(loadingToast);
      if (response?.data?.msg && showLoadingToast) toast.success(response.data.msg);

      return response.data;
    } catch (error) {
      if (loadingToast) toast.dismiss(loadingToast);
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        error.message ||
        "Error desconocido";
      if (showLoadingToast) toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };

  return { fetchDataBackend };
}

export default useFetch;
