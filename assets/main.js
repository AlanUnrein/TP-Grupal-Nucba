const categories_card= document.getElementsByClassName('categories__card');
const mostrarProdCategorias = document.querySelector('.mostrarProdCategorias');
const recommend = document.querySelector('.recommend');

//variables del carrito
const cartContainer = document.querySelector('.cart__container')
const carrito = document.querySelector('.cart__menu')
const btnCerrarCarrito = document.querySelector('.cart__button')
const addButton = document.querySelector('.addButton')
const cart__ul = document.querySelector('.cart__ul')
const cart__li = document.querySelector('.cart__li')
const quantity = document.querySelector('.quantity')
const cart__subtotal = document.querySelector('.cart__subtotal span')
const cart__total = document.querySelector('.cart__total span')
const count__less = document.querySelector('.count__less')
const count__more = document.querySelector('.count__more')
const shopBtn = document.querySelector('.cart__shop')
const emptyBtn = document.querySelector('.cart__empty')




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
                <button data-id="${id}" data-nombre="${nombre}" data-precio="${precio}" data-imagenes="${imagenes}" class="addButton">Agregar</button>
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


/* Funcion para renderizar la seccion de recomendados */
const recommendHTML = (food) => {
    return `
        <div class="recommend__card" >
          <img src=${food.imagenes} alt="pizza" />
          <div class="recommend__card--text">
            <h2 class="recommend__card--h2">${food.nombre}</h2>
            <p class="recommend__card--p">${food.ingredientes.join(' - ')}</p>
            <span class="recommend__card-span prices">$${food.precio}</span>
          </div>
          <button data-category="${food.categoria}"data-id="${food.id}" data-nombre="${food.nombre}" data-precio="${food.precio}" data-imagenes="${food.imagenes}" class="addButton">Agregar</button>
        </div>`
}
        //   <button class="addButton" data-category="${food.categoria}" data-id="${food.id}">Agregar</button>

const renderRecommend = async () => {
    const fetchedFood = await requestProducts();
    const arrayRecommend = fetchedFood.sort(()=> Math.random() - 0.5).slice(0, 3) 
     /* Ordena el array de forma aleatoria y toma los primeros 3 */
    recommend.innerHTML = arrayRecommend.map(food => recommendHTML(food)).join('')
}

//-----------------------FUNCIONES DEL CARRITO-----------------------

//array donde se guardan los productos selecciondos
let cart = JSON.parse(localStorage.getItem('cart')) || []

// setear en el localstorage el los elementos del carrito
const saveLocalStorage =  (cartList) => {
    localStorage.setItem("cart", JSON.stringify(cartList));
  }

  
const renderCart= () => {
    if(!cart.length){
        cart__ul.textContent= 'Aún no hay productos en la carta.'
        return;
    } 
    cart__ul.innerHTML = cart.map(cartItem => createHTMLCart(cartItem)).join('');
}

/* ABRIR Y CERRAR CARRITO */
    const toggleCarrito = () => {
        cartContainer.classList.toggle("open__cart")
    }
    const cerrarCarrito = () => {
        cartContainer.classList.toggle('open__cart')
    }
/* CERRAR CARRITO CON SCROLL*/    
    const closeOnScroll = () => {
        if (!cartContainer.classList.contains('open__cart')) return 
        cartContainer.classList.remove('open__cart')
    }
 

// Cantidad total y subtotal del carrito
const cambiarPrecioCantidad =()=> {   
    quantity.textContent = cart.reduce((acc, cur) => acc + cur.quantity ,0)
    cart__total.innerHTML = `$${cart.reduce((acc, cur) => acc + cur.precio * cur.quantity, 0)}`;
    cart__subtotal.textContent = `$${cart.reduce((acc, cur) => acc + cur.precio * cur.quantity, 0)}`;
}
// funcion desabilitar botones comprar y vaciar 
const disableBtn = (btn) => {
    if (!cart.length) {
      btn.classList.add("disabled");
    } else {
      btn.classList.remove("disabled");
    }
  };


const createHTMLCart= array => {
     const {id,imagenes, nombre, precio, quantity} = array
    return`
    <li class="cart__li">
        <div class="cart__item">
        <img class="cart__item--img" src="${imagenes}" alt="pizza" />
        <div class="cart__item--text">
            <h3 class="cart__item--h3">${nombre}</h3>
            <span class="cart__item--span prices">$ ${precio}</span>
        </div>
        <div class="count" >
            <button class="count__less cart__button" data-id="${id}">-</button>
            <div class="count__counting">${quantity}</div> <!-- Cantidad actual de ese item -->
            <button class="count__more cart__button" data-id="${id}">+</button>
        </div>
    </li>
    `
}

const createProductData = (id,nombre,precio,imagenes) => {
    return {id,nombre,precio,imagenes}
}

const addProduct = array => {
    if(cart.find(product=> product.id === array.id)){
        cart = cart.map(cartProduct => {
            return cartProduct.id === array.id ? {... cartProduct, quantity: cartProduct.quantity+1} 
            : cartProduct;
        })
    }
}

const checkQuantity = () => {
    if (!cart.length) { 
        quantity.classList.add('hidden')
        return
    } else if (cart.length) {
        quantity.classList.remove('hidden')
        return
    }    
}
 
// CHEQUEAR ESTADO DEL CART
const checkCartState = () => {
    checkQuantity()
    saveLocalStorage(cart);
    renderCart(cart);
    cambiarPrecioCantidad(cart)
    disableBtn(emptyBtn)
    disableBtn(shopBtn)
}

const addProductCart = async e => {
    if(!e.target.classList.contains('addButton')) return;
    
        const {id, nombre, precio, imagenes} = e.target.dataset;
        const producto = createProductData(id,nombre,precio,imagenes)

        if(cart.find(product => product.id === producto.id)){
            cart = cart.map(cartProduct => {
                return cartProduct.id === producto.id ? {... cartProduct, quantity: cartProduct.quantity+1} 
                : cartProduct;
            })
        } else {
            cart = [... cart,{ ... producto,quantity:1} ]
        }
        
        checkCartState()
}


// BOTON SUMAR CANTIDAD
const btnMore = (e) => {
    if(!e.target.classList.contains('count__more')) return;
    const {id, nombre, precio, imagenes} = e.target.dataset;
    const producto = createProductData(id,nombre,precio,imagenes)

    if(cart.find(product=> product.id === producto.id)){
        cart = cart.map(cartProduct => {
            return cartProduct.id === producto.id ? {... cartProduct, quantity: cartProduct.quantity+1} 
            : cartProduct;
        })
    }
    cambiarPrecioCantidad()
    renderCart(cart)
}
// BOTON RESTAR CANTIDAD
const btnLess = (e) => {
    if(!e.target.classList.contains('count__less')) return;
    const {id, nombre, precio, imagenes} = e.target.dataset;
    const producto = createProductData(id,nombre,precio,imagenes)
    

    if(cart.find(product=> product.id === producto.id)){
        cart = cart.map(cartProduct => {
            return cartProduct.id === producto.id ? { ... cartProduct, quantity: cartProduct.quantity-1} 
            : cartProduct;
        })
    } 
    if(cart.find(producto => {
        if(producto.quantity === 0){
            if(window.confirm('Desea eliminar producto?')){
                removeProductFromCart(e);
            } else {
                producto.quantity=1;
            }
        }
        cambiarPrecioCantidad()
    }))
    cambiarPrecioCantidad()
    checkCartState()
}

const removeProductFromCart = (e) => {
    const valorID = e.target.dataset.id;
    cart = cart.filter((product) => product.id !== valorID);
  };

const resetCart = () => {
    cart = [];
    checkCartState();
}

// MENSAJES DE CONFIRMACION PARA BOTONES DEL CARRITO 
  const confirmCartAction = (confirmMsg, successMsg) => {
    if (!cart.length) return;
    if (window.confirm(confirmMsg)) {
      resetCart();
      alert(successMsg);
      cartContainer.classList.remove('open__cart')
    }
    };
    const confirmEmpty = () => {
        confirmCartAction('¿Deseas vaciar los elementos del carrito?', 'El carrito se ha vaciado');
    }
    const confirmShop = () => {
        confirmCartAction('¿Deseas completar tu compra?', 'Gracias por tu compra')
    }

const init = () => {
    renderRecommend();
    
    //eventos del carrito
    checkQuantity()
    window.addEventListener('scroll', closeOnScroll)
    carrito.addEventListener('click', toggleCarrito)
    btnCerrarCarrito.addEventListener('click', cerrarCarrito)
    document.addEventListener('click', addProductCart)
    document.addEventListener('click', btnMore)
    document.addEventListener('click', btnLess)
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", cambiarPrecioCantidad);
    shopBtn.addEventListener('click', confirmShop)
    emptyBtn.addEventListener('click', confirmEmpty)
    
    for (let i = 0; i < categories_card.length; i++) {
    categories_card[i].addEventListener('click', mostrarCategorias)   
}
};


init();