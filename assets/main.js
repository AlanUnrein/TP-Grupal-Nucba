const categories_card= document.getElementsByClassName('categories__card')
const mostrarProdCategorias = document.querySelector('.mostrarProdCategorias')


const createCardsCategorias = categorias=>{
    const {nombre, precio, imagenes, ingredientes} = categorias;
    return `
        <li class="categoria__productos">
            <img src="${imagenes}" alt="" class="categoria__productos__img">
            <h3 class="categoria__productos__nombre">${nombre}</h3>
            <h2 class="categoria__productos__ingredientes">Ingredientes: ${ingredientes}</h2>
            <h3 class="categoria__productos__precio">$${precio}</h3>
        </li>
    `
}

const renderCardsCategorias = categorias => {
    mostrarProdCategorias.innerHTML = categorias.map(categoria => createCardsCategorias(categoria));
}
const mostrarCategorias= async (e)=> {
     if(!e.target.classList.contains('categories_card')){
        const valueCategoria = e.target.dataset.id;
        const arrayCategorias = await requestAPI(valueCategoria)
        renderCardsCategorias(arrayCategorias)
        return;
    }
}


const saveLocalStorage = async () => {
  const menu = await requestAPI();
  localStorage.setItem("categorias", JSON.stringify(menu));
}




const init = () => {
  saveLocalStorage();
  for (let i = 0; i < categories_card.length; i++) {
    categories_card[i].addEventListener('click', mostrarCategorias)   
}

};

init();