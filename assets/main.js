const categories_card= document.getElementsByClassName('categories__card');
const mostrarProdCategorias = document.querySelector('.mostrarProdCategorias');
const recommend = document.querySelector('.recommend');





const createCardsCategorias = categorias=>{
    const {nombre, precio, imagenes, ingredientes, id} = categorias;
    return `
        <li class="categoria__productos">
            <img src="${imagenes}" alt="" class="categoria__productos__img">
            <h3 class="categoria__productos__nombre">${nombre}</h3>
            <p class="categoria__productos__ingredientes">Ingredientes: ${ingredientes.join(', ')}.</p>
            <div class="productos__container">
                <span class="prices">$${precio}</span>
                <button data-id="${id}" class="addButton">Agregar</button>
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
        const arrayCategorias = await requestAPI(valueCategoria)
        renderCardsCategorias(arrayCategorias)
        return;
    }
}


const saveLocalStorage = async () => {
  const menu = await requestAPI();
  localStorage.setItem("categorias", JSON.stringify(menu));
}


/* Funcion para renderizar la seccion de recomendados (tres elementos traidos aleatoriamente del array original) */
const recommendHTML =  (food) => {
    return `
        <div class="recommend__card data-category="${food.categoria}" data-id="${food.id}"">
          <img src=${food.imagenes} alt="pizza" />
          <div class="recommend__card--text">
            <h2 class="recommend__card--h2">${food.nombre}</h2>
            <p class="recommend__card--p">${food.ingredientes.join(' - ')}</p>
            <span class="recommend__card-span prices">$${food.precio}</span>
          </div>
          <button class="addButton">Agregar</button>
        </div>`
}
const renderRecommend = async () => {
    const fetchedFood = await requestProducts();

    recommend.innerHTML = fetchedFood.map(food => recommendHTML(food)).join('')
}


const init = () => {
    renderRecommend();
    saveLocalStorage();
    for (let i = 0; i < categories_card.length; i++) {
    categories_card[i].addEventListener('click', mostrarCategorias)   
}
};


init();