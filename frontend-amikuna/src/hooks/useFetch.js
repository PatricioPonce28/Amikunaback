import axios from 'axios'
import { toast } from 'react-toastify'

function useFetch() {

    const fetchDataBackend = async (url, form = null, method = 'POST') => {
        try {
            // Obtén token del localStorage
            const token = localStorage.getItem('token');

            // Configuración común para axios
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            };

            let respuesta;
            if (method === 'POST') {
                respuesta = await axios.post(url, form, config);
            } else if (method === 'GET') {
                respuesta = await axios.get(url, config);
            } else {
                throw new Error(`Método HTTP ${method} no soportado`);
            }

            // Mostrar mensaje solo si viene del backend (opcional)
            if (respuesta?.data?.msg) {
                toast.success(respuesta.data.msg);
            }
            
            return respuesta.data;
        } catch (error) {
            const errorMsg = error.response?.data?.msg || 'Error desconocido';
            toast.error(errorMsg);
            throw new Error(errorMsg);
        }
    }

    return { fetchDataBackend }
}

export default useFetch;
