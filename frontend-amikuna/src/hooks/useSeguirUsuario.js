import useFetch from "./useFetch";

const useSeguirUsuario = () => {
  const { fetchDataBackend } = useFetch();

  const toggleSeguir = async (idSeguido) => {
    const data = await fetchDataBackend(`/estudiantes/seguir/${idSeguido}`, null, "POST");
    return data;
  };

  return { toggleSeguir };
};

export default useSeguirUsuario;
