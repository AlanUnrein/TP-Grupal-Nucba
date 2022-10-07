const saveLocalStorage = async () => {
  const menu = await requestAPI();
  localStorage.setItem("categorias", JSON.stringify(menu));
};

const init = () => {
  saveLocalStorage();
};

init();
