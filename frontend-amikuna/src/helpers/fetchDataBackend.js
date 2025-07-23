import axios from 'axios';

const API_URL = 'http://localhost:3000/api/'; // cambia si usas dominio diferente

const fetchDataBackend = async (endpoint, token) => {
  const { data } = await axios.get(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

export default fetchDataBackend;
