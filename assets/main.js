const categories_card= document.getElementsByClassName('categories__card');
const mostrarProdCategorias = document.querySelector('.mostrarProdCategorias');
const recommend = document.querySelector('.recommend');

//variables del carrito
const cart__container = document.querySelector('.cart__container')
const carrito = document.querySelector('.fa-solid.fa-cart-shopping')
const btnCerrarCarrito = document.querySelector('.cart__button')
const addButton = document.querySelector('.addButton')
const cart__ul = document.querySelector('.cart__ul')
const cart__li = document.querySelector('.cart__li')
const quantity = document.getElementById('quantity')



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
    const arrayRecommend = fetchedFood.sort(()=> Math.random() - 0.5).slice(0, 3) 
     /* Ordena el array de forma aleatoria y toma los primeros 3 */
    recommend.innerHTML = arrayRecommend.map(food => recommendHTML(food)).join('')
}

//FUNCIONES DEL CARRITO

//array donde se guardan los productos selecciondos
let cart = []

const mostrarCarrito = e => {
  if(!e.target.classList.contains('fa-solid fa-cart-shopping')){
    cart__container.classList.remove('hidden')
    return;
  } 
}
const cerrarCarrito = e => {
    if(e.target.classList.contains('cart__button')){
            cart__container.classList.add('hidden')
            return;
    }
}

const addProductCart = async e => {
    const count__counting = document.querySelector('.count__counting')
    if(!e.target.classList.contains('addButton')){
        if(!cart.length){
            cart__ul.textContent= 'Aún no hay productos en la carta.'
            quantity.classList.add('hidden')
            return;
        } 
        return;
    }  
    
            const productoSeleccionado = Number(e.target.dataset.id)
            const productosAPI = await requestAPI()
            if(cart.some(producto => producto.id === productoSeleccionado)){
                count__counting.innerHTML = cart.length;
                quantity.innerHTML= cart.length;
                return;
            }
            cart.push(productosAPI.flat().find(producto => producto.id === productoSeleccionado))

            console.log(cart)
            
            
            quantity.classList.remove('hidden')
            quantity.innerHTML= cart.length;
            renderCreateHTMLCart(cart)
        
}

const renderCreateHTMLCart= array => {
    cart__ul.innerHTML = array.map(productos => createHTMLCart(productos))
}

const createHTMLCart= array => {
     const {imagenes, ingredientes, nombre, precio} = array
    return`
    <li class="cart__li">
    <div class="cart__item">
      <img class="cart__item--img" src="${imagenes}" alt="pizza" />
      <div class="cart__item--text">
        <h3 class="cart__item--h3">${nombre}</h3>
        <p class="cart__item--p">Descripcion: ${ingredientes}</p>
        <span class="cart__item--span prices">$ ${precio}</span>
      </div>
      <div class="count">
        <div class="count__less cart__button">-</div>
        <div class="count__counting"></div> <!-- Cantidad actual de ese item -->
        <div class="count__more cart__button">+</div>
      </div>
  </li>
    `
}

const init = () => {
    renderRecommend();
    saveLocalStorage();
    carrito.addEventListener('click', mostrarCarrito)
    btnCerrarCarrito.addEventListener('click',cerrarCarrito)
    document.addEventListener('click', addProductCart)

    for (let i = 0; i < categories_card.length; i++) {
    categories_card[i].addEventListener('click', mostrarCategorias)   
}
};


init();