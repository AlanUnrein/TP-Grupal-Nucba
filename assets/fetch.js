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


