const categories_card1= document.querySelector('.categories__card1')
const categories_card2= document.querySelector('.categories__card2')
const categories_card3= document.querySelector('.categories__card3')
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
     if(!e.target.classList.contains('categories_card1') || !e.target.classList.contains('categories_card2') || !e.target.classList.contains('categories_card3')){
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
  categories_card1.addEventListener('click', mostrarCategorias)
  categories_card2.addEventListener('click', mostrarCategorias)
  categories_card3.addEventListener('click', mostrarCategorias)
};

init();
