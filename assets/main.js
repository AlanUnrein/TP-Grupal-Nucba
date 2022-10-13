const categories_card= document.getElementsByClassName('categories__card')
const categories_card_vacia= document.getElementsByClassName('categories__card vacia')
const mostrarProdCategorias = document.querySelector('.mostrarProdCategorias')
const arrowCategorias = document.getElementById('arrowCategorias')

//funciones para mostrar cards productos segun categorias.
const createCardsCategorias = categorias=>{
    const {nombre, precio, imagenes, ingredientes} = categorias;
    return `
        <li class="categoria__productos">
            <img src="${imagenes}" alt="" class="categoria__productos__img">
            <h3 class="categoria__productos__nombre">${nombre}</h3>
            <h2 class="categoria__productos__ingredientes">Ingredientes: ${ingredientes.join(', ')}.</h2>
            <p class="categoria__productos__precio">$${precio}</p>
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


const init = () => {
  saveLocalStorage();
  for (let i = 0; i < categories_card.length; i++) {
    categories_card[i].addEventListener('click', mostrarCategorias)   
}
};

init();