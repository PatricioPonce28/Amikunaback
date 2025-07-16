import useFetch from "./useFetch";

const useChatGemini = () => {
  const { fetchDataBackend } = useFetch();

  const enviarMensaje = async (mensaje) => {
    if (!mensaje.trim()) return null;

    const response = await fetchDataBackend(
      '/estudiantes/perfil/chat',
      { mensaje },
      "POST"
    );

    return response.respuesta;
  };

  return { enviarMensaje };
};

export default useChatGemini;
