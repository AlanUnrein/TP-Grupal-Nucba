const categories_card= document.getElementsByClassName('categories__card');
const mostrarProdCategorias = document.querySelector('.mostrarProdCategorias');
const recommend = document.querySelector('.recommend');




//funciones para mostrar cards productos segun categorias.
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
///////////////////////////////////


// FUNCION PARA OCULTAR FLECHA
const hiddenCategorias = () =>{ 
     const productos = document.querySelectorAll('.categoria__productos')
     productos.forEach(producto => producto.style.display = 'none' )
     arrowCategorias.style.display = 'none';
}
//////////////////////////////////

//FUNCIONES PARA MOSTRAR "CATEGORIA NO DISPONIBLE"
const createHTMLcardVacia = () => {
    return`
    <li class="categoriaVacia">
      <h3 class="titulo-categoriaVacia">Lo sentimos, aún no contamos con esta categoria :/</h3>
    </li>
    `
}
const renderCreateHTMLcardVacia = () => {
    mostrarProdCategorias.innerHTML = createHTMLcardVacia();
}
/////////////////////////////////


const mostrarCategorias= async (e)=> {
   if(e.target.classList.contains('vacia')){
    renderCreateHTMLcardVacia();
    return null;
   } else if(!e.target.classList.contains('categories_card')){
        const valueCategoria = e.target.dataset.id;
        const arrayCategorias = await requestAPI(valueCategoria)
        renderCardsCategorias(arrayCategorias)
        arrowCategorias.style.display = 'flex';
        return;
    } 
}



const saveLocalStorage = async () => {
  const menu = await requestAPI();
  localStorage.setItem("categorias", JSON.stringify(menu));
}


/* Funcion para renderizar la seccion de recomendados */
const recommendHTML =  (food) => {
    return `
        <div class="recommend__card" >
          <img src=${food.imagenes} alt="pizza" />
          <div class="recommend__card--text">
            <h2 class="recommend__card--h2">${food.nombre}</h2>
            <p class="recommend__card--p">${food.ingredientes.join(' - ')}</p>
            <span class="recommend__card-span prices">$${food.precio}</span>
          </div>
          <button class="addButton" data-category="${food.categoria}" data-id="${food.id}">Agregar</button>
        </div>`
}

const renderRecommend = async () => {
    const fetchedFood = await requestProducts();
    const arrayRecommend = fetchedFood.sort(()=> Math.random() - 0.5).slice(0, 3)  /* Ordena el array de forma aleatoria y toma los primeros 3 */
    recommend.innerHTML = arrayRecommend.map(food => recommendHTML(food)).join('')
}


const init = () => {
    renderRecommend();
    saveLocalStorage();
    for (let i = 0; i < categories_card.length; i++) {
    categories_card[i].addEventListener('click', mostrarCategorias)   
}
};


init();