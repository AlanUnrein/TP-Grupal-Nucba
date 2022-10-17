const baseURL = `https://apipizza.herokuapp.com/api/`;

const requestAPI = async (categoria) => {
  try {
    const query = `?categoria=${categoria}`;
    const resultado = await fetch(baseURL + query);
    const json = await resultado.json();
    return json;
  } catch (error) {
    console.error(`No se encontraron resultados` + error);
  }
};

const requestProducts = async () => {
  const res = await fetch(baseURL);
  const data = await res.json();
  return data.flat();
}



