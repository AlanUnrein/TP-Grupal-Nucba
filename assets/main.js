const categories_card= document.getElementsByClassName('categories__card');
const mostrarProdCategorias = document.querySelector('.mostrarProdCategorias');


const createCardsCategorias = categorias=>{
    const {nombre, precio, imagenes, ingredientes, id} = categorias;
    return `
        <li class="categoria__productos">
            <img src="${imagenes}" alt="" class="categoria__productos__img">
            <h3 class="categoria__productos__nombre">${nombre}</h3>
            <p class="categoria__productos__ingredientes">Ingredientes: ${ingredientes.join(', ')}.</p>
            <div class="productos__container">
                <span class="prices">$${precio}</span>
                <button id="add${id}" class="addButton">Agregar</button>
            </div>    
        </li>
    `
}

const renderCardsCategorias = categorias => {
    mostrarProdCategorias.innerHTML = categorias.map(categoria => createCardsCategorias(categoria));
}

const mostrarCategorias= async (e)=> {
     if(!e.target.classList.contains('categories_card')){
        const valueCategoria = e.target.dataset.id;
        const arrayCategorias = await requestAPI(valueCategoria);
        renderCardsCategorias(arrayCategorias);
        return;
    }
}


const saveLocalStorage = async () => {
  const menu = await requestAPI();
  localStorage.setItem("categorias", JSON.stringify(menu));
}

/* Funcion para agregar al cart */



const init = () => {
  saveLocalStorage();
  for (let i = 0; i < categories_card.length; i++) {
    categories_card[i].addEventListener('click', mostrarCategorias)   
}

};

init();