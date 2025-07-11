import axios from "axios";
import { toast } from "react-toastify";

function useFetch() {
  const fetchDataBackend = async (url, data = null, method = "GET", headers = {}) => {
    const loadingToast = toast.loading("Procesando solicitud...");
    try {
      // Obtener token del localStorage y agregarlo a headers si existe
      const token = localStorage.getItem("token");
      const combinedHeaders = {
        "Content-Type": "application/json",
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const options = {
        method,
        url,
        headers: combinedHeaders,
      };

      if (method !== "GET") {
        options.data = data;
      }

      const response = await axios(options);

      toast.dismiss(loadingToast);
      if (response?.data?.msg) toast.success(response.data.msg);
      return response.data;
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error(error);
      const errorMsg =
        error.response?.data?.msg ||
        error.response?.data?.error ||
        error.message ||
        "Error desconocido";
      toast.error(errorMsg);
      throw new Error(errorMsg);
    }
  };

  return { fetchDataBackend };
}

export default useFetch;
